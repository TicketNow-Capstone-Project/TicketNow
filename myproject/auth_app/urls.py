from django.urls import path
from . import views

urlpatterns = [
    path('api/register/', views.register_user, name='register'),
    path('api/check-auth/', views.check_auth, name='check-auth'),
    path('api/csrf-token/', views.get_csrf_token, name='csrf-token'),  # ← ADD THIS
    # ... your other URLs
]   