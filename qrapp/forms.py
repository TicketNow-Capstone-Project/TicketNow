from django import forms
from .models import DriverInfo

class DriverInfoForm(forms.ModelForm):
    class Meta:
        model = DriverInfo
        fields = '__all__'