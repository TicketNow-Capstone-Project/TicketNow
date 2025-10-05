from django.contrib import admin
from .models import Driver_Table, Vehicle_Table, Ticket_Table, Trip_Table, Bookings_Table

@admin.register(Ticket_Table)
class TicketAdmin(admin.ModelAdmin):
    list_display = ("ticket_id", "trip_id", "price", "tickets_quantity")   # show these columns
    search_fields = ("ticket_id",)
    list_filter = ("price",)
    list_editable = ("price", "tickets_quantity")

@admin.register(Trip_Table)
class TripAdmin(admin.ModelAdmin):
    list_display = ("trip_id", "trip_name", "origin", "destination", "departure_time", "driver_id", "vehicle_id")
    search_fields = ("trip_id",)
    list_filter = ("origin", "destination")
    list_editable = ("trip_name", "origin", "destination", "departure_time")

@admin.register(Driver_Table)
class DriverAdmin(admin.ModelAdmin):
    list_display = ['driver_id','first_name', 'last_name', 'contact_number', 'license_number', 'license_expiry', 'authority_to_drive', 'is_active']
    list_filter = ['authority_to_drive', 'is_active', 'license_expiry', 'date_registered']
    search_fields = ['first_name', 'last_name', 'contact_number', 'license_number']
    list_editable = ['authority_to_drive', 'is_active']
    list_display_links = ['driver_id']
  
@admin.register(Vehicle_Table)
class VehicleAdmin(admin.ModelAdmin): 
    list_display = ['vehicle_id', 'vehicle_name', 'plate_number', 'vehicle_type', 'seat_capacity', 'manufacturer', 'year', 'is_active']
    list_filter = ['vehicle_type', 'is_active', 'manufacturer', 'year']
    search_fields = ['vehicle_name', 'plate_number', 'registration_number', 'manufacturer']
    list_editable = ['is_active']
    list_display_links = ['vehicle_id', 'vehicle_name']

@admin.register(Bookings_Table)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'ticket', 'passenger', 'quantity', 'status', 'booked_at', 'updated_at')
    list_filter = ('status', 'ticket__trip_id')
    search_fields = ('ticket__trip_id__trip_name', 'passenger__username')
    ordering = ('-booked_at',)
    readonly_fields = ('booked_at', 'updated_at')
    
    # Only status and quantity are editable inline safely
    list_editable = ('status', 'quantity')
