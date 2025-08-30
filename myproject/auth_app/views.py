from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserRegistrationSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_auth(request):
    return Response({
        'success': True,
        'user': {
            'id': request.user.id,
            'username': request.user.username,
            'firstname': request.user.firstname,
            'lastname': request.user.lastname,
            'email': request.user.email
        }
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    if request.method == 'POST':
        serializer = UserRegistrationSerializer(data=request.data)
        
        if serializer.is_valid():
            try:
                user = serializer.save()
                return Response({
                    'success': True,
                    'message': 'Registration successful',
                    'redirect': '/login/',  # Change this to your desired redirect URL
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'first_name': user.first_name,
                        'last_name': user.last_name
                    }
                }, status=status.HTTP_201_CREATED)
                
            except Exception as e:
                return Response({
                    'success': False,
                    'error': str(e),
                    'message': 'Registration failed due to server error'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            # Format errors for React frontend
            errors = serializer.errors
            field_errors = {}
            
            for field, error_list in errors.items():
                if field == 'username' and 'unique' in str(error_list).lower():
                    field_errors = {
                        'field': 'username',
                        'error': 'Username already exists',
                        'message': 'This username is already taken. Please choose another one.'
                    }
                elif field == 'phone' and 'unique' in str(error_list).lower():
                    field_errors = {
                        'field': 'phone',
                        'error': 'Phone number already registered',
                        'message': 'This phone number is already associated with an account.'
                    }
                else:
                    field_errors = {
                        'field': field,
                        'error': str(error_list[0]),
                        'message': str(error_list[0])
                    }
                break  # Return first error only
            
            return Response({
                'success': False,
                **field_errors
            }, status=status.HTTP_400_BAD_REQUEST)