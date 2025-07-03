from django.db import models

class DriverInfo(models.Model):
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100)
    address = models.TextField()
    vehicle_type = models.CharField(max_length=50)
    plate_number = models.CharField(max_length=20)
    route_taken = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"