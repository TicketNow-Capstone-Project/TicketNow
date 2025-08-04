from django.db import models

# Create your models here.

class Ticket(models.Model):
    passenger_name = models.CharField(max_length=100)
    contact = models.CharField(max_length=15)
    destination = models.CharField(max_length=100)
    departure_time = models.DateTimeField()
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.passenger_name} - {self.destination}"
    
class TripSchedule(models.Model):
    destination = models.CharField(max_length=100)
    departure_time = models.DateTimeField()
    driver = models.CharField(max_length=100, default='Unknown')
    driver_contact = models.CharField(max_length=20, default='0000000000')

    def __str__(self):
        return f"{self.destination} - {self.departure_time.strftime('%Y-%m-%d %H:%M')}"

class RegisteredDriver(models.Model):
    name = models.CharField(max_length=100)
    contact = models.CharField(max_length=50)
    image = models.ImageField(upload_to='drivers/', blank=True, null=True)

    def __str__(self):
        return self.name