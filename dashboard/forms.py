from django import forms
from .models import Ticket

class TicketForm(forms.ModelForm):
    class Meta:
        model = Ticket
        fields = ['passenger_name', 'contact', 'destination', 'departure_time', 'notes']


