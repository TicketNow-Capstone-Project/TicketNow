from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password, check_password


class AdminAccount(models.Model):
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=255)  # hashed

    def set_password(self, raw_password):
        self.password = make_password(raw_password)
        self.save()

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def __str__(self):
        return self.username


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
    driver_image = models.ImageField(upload_to='driver_images/', null=True, blank=True)

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
