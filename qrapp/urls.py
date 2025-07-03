from django.urls import path
from . import views

urlpatterns = [
    path('', views.generate_qr, name='home'),  # fixed line
]
