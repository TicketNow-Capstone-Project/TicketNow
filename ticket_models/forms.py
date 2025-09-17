from django import forms
from .models import Trip_Table, Ticket_Table

class TripForm(forms.ModelForm):
    class Meta:
        model = Trip_Table
        fields = ['trip_name', 'origin', 'destination']

class TicketForm(forms.ModelForm):
    class Meta:
        model = Ticket_Table
        fields = ["price", "appointed_schedule", "tickets_qty", "trip_id"]
        widgets = {
            "appointed_schedule": forms.DateTimeInput(attrs={"type": "datetime-local"}),
        }