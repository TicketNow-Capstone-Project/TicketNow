from django.contrib import admin
from .models import Ticket_Table
from .models import Trip_Table

@admin.register(Ticket_Table)
class TicketAdmin(admin.ModelAdmin):
    list_display = ("ticket_id", "trip_id", "price", "appointed_schedule", "tickets_qty")   # show these columns
    search_fields = ("ticket_id",)
    list_filter = ("appointed_schedule",)
    list_editable = ("price", "appointed_schedule", "tickets_qty")

@admin.register(Trip_Table)
class TripAdmin(admin.ModelAdmin):
    list_display = ("trip_id", "trip_name", "origin", "destination")
    search_fields = ("trip_id",)
    list_filter = ("origin", "destination")
    list_editable = ("trip_name", "origin", "destination")


