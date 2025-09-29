from django.urls import path
from . import views

app_name = "tickets"   # 👈 this enables {% url 'tickets:home' %}
urlpatterns = [
    path("operations/", views.operations_page, name="operations"),
    path("resources/", views.resources_page, name="resources"),
    path('operations/<str:page_name>/', views.operations_page_view, name='operations_page_view'),
    path('resources/<str:page_name>/', views.resources_page_view, name='resources_page_view'),
]

