from django.urls import path
from . import views

urlpatterns = [
    path('api/login/', views.login_api, name='login_api'),
    path('api/logout/', views.logout_api, name='logout_api'),
    path('api/auth-status/', views.check_auth_status, name='auth_status'),
    
]