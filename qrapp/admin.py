from django.contrib import admin
from .models import DriverInfo

@admin.register(DriverInfo)
class DriverInfoAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'plate_number', 'vehicle_type', 'route_taken']
    search_fields = ['plate_number', 'first_name', 'last_name']
