from django.db import models
from django.utils import timezone

class DriverInfo(models.Model):
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100)
    address = models.TextField()
    vehicle_type = models.CharField(max_length=50)
    plate_number = models.CharField(max_length=20, unique=True)
    route_taken = models.CharField(max_length=200)
    qr_code = models.ImageField(upload_to='qrapp/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def name(self):
        # To use `{{ driver.name }}` in templates
        return f"{self.first_name} {self.middle_name or ''} {self.last_name}".strip()

    @property
    def route(self):
        return self.route_taken

    @property
    def vehicle(self):
        return self.vehicle_type


class DriverQueue(models.Model):
    driver = models.ForeignKey(DriverInfo, on_delete=models.CASCADE)
    scanned_at = models.DateTimeField(auto_now_add=True)
    departure_time = models.DateTimeField()
    is_done = models.BooleanField(default=False)

    class Meta:
        ordering = ['departure_time']

    def __str__(self):
        return f"{self.driver} - Departs at {self.departure_time.strftime('%H:%M')}"
