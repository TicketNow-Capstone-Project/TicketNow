# login_auth/middleware.py
from django.utils.deprecation import MiddlewareMixin
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed

class JWTAuthMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Skip if user is already authenticated via session
        if hasattr(request, 'user') and request.user.is_authenticated:
            return
        
        # Try JWT authentication
        jwt_authenticator = JWTAuthentication()
        
        try:
            auth_result = jwt_authenticator.authenticate(request)
            if auth_result is not None:
                user, token = auth_result
                request.user = user
                request.auth = token
        except (InvalidToken, AuthenticationFailed):
            # JWT token is invalid, continue without authentication
            pass
        except Exception:
            # Other exceptions, continue without authentication
            pass