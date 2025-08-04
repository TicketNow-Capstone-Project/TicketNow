from django.contrib import admin
from .models import Ticket,TripSchedule,RegisteredDriver

# Register your models here.
admin.site.register(Ticket)
admin.site.register(TripSchedule)
admin.site.register(RegisteredDriver)


