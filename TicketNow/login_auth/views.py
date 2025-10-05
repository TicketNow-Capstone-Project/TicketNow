from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from auth_app.models import CustomUser
import logging

logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_api(request):
    """
    Login API using session authentication
    """
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({
                'success': False,
                'message': 'Username and password are required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Authenticate user
        user = authenticate(username=username, password=password)
        
        if user is None:
            # Check if user exists but password is wrong
            try:
                user_exists = CustomUser.objects.filter(username=username).exists()
                if user_exists:
                    return Response({
                        'success': False,
                        'message': 'Invalid password'
                    }, status=status.HTTP_401_UNAUTHORIZED)
                else:
                    return Response({
                        'success': False,
                        'message': 'User not found'
                    }, status=status.HTTP_404_NOT_FOUND)
            except Exception:
                return Response({
                    'success': False,
                    'message': 'Invalid credentials'
                }, status=status.HTTP_401_UNAUTHORIZED)
        
        if not user.is_active:
            return Response({
                'success': False,
                'message': 'Account is deactivated'
            }, status=status.HTTP_401_UNAUTHORIZED)
        
        # Login user (creates session)
        login(request, user)
        
        # Get CSRF token for React
        csrf_token = get_token(request)
        
        response_data = {
            'success': True,
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'username': user.username,
                'first_name': user.firstname,
                'last_name': user.lastname,
                'phone': user.phone,
            },
            'redirect': '/dashboard',
            'csrf_token': csrf_token
        }
        
        return Response(response_data, status=status.HTTP_200_OK)
        
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return Response({
            'success': False,
            'message': 'Internal server error'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_api(request):
    """
    Logout API to clear session
    """
    try:
        logout(request)
        
        response = Response({
            'success': True,
            'message': 'Logout successful'
        }, status=status.HTTP_200_OK)
        
        # Clear session cookie
        response.delete_cookie('sessionid')
        response.delete_cookie('csrftoken')
        
        return response
        
    except Exception as e:
        logger.error(f"Logout error: {str(e)}")
        return Response({
            'success': False,
            'message': 'Logout failed'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def check_auth_status(request):
    """
    Check if user is authenticated using session
    """
    if request.user.is_authenticated:
        return Response({
            'authenticated': True,
            'user': {
                'id': request.user.id,
                'username': request.user.username,  
                'first_name': request.user.firstname,
                'last_name': request.user.lastname,
                 'phone': request.user.phone 
            }
        }, status=status.HTTP_200_OK)
    else:
        return Response({
            'authenticated': False,
            'message': 'Not authenticated'
        }, status=status.HTTP_401_UNAUTHORIZED)