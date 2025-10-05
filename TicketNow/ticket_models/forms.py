from django import forms
from .models import Trip_Table, Ticket_Table, Driver_Table, Vehicle_Table

class TripForm(forms.ModelForm):
    class Meta:
        model = Trip_Table
        exclude = ['id']
        widgets = {
            'departure_time': forms.DateTimeInput(
                attrs={'type': 'datetime-local', 'class': 'form-control'}
            ),
        }


class TicketForm(forms.ModelForm):
    class Meta:
        model = Ticket_Table
        # Include all fields automatically (except the auto ID)
        exclude = ['id']


class DriverForm(forms.ModelForm):
    class Meta:
        model = Driver_Table
        # Include all fields automatically (except the auto ID)\
        exclude = ['id']
        widgets = {
            'license_expiry': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
        }

        


class VehicleForm(forms.ModelForm):
    class Meta:
        model = Vehicle_Table
        # Include all fields automatically (except the auto ID)
        exclude = ['id']