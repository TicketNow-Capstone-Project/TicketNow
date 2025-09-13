from django.urls import path
from . import views

app_name = "tickets"   # 👈 this enables {% url 'tickets:home' %}
urlpatterns = [
    path("ticket_page/", views.ticket_page, name="ticket_page"),   # this will be 'tickets:home'
]
