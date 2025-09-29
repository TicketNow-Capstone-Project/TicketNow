from django.db import models

# Create your models here.


class Driver_Table(models.Model):
    # Basic Information
    driver_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True, null=True)
    contact_number = models.CharField(max_length=15, unique=True)
    address = models.TextField()

    # License & Permit
    license_number = models.CharField(max_length=20, unique=True)
    license_expiry = models.DateField()
    authority_to_drive = models.BooleanField(default=False)

    # Documents
    photo = models.ImageField(upload_to='drivers/photos/', blank=True, null=True)

    # Metadata
    date_registered = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.last_name}, {self.first_name}"
    


class Vehicle_Table(models.Model):
    # Basic Info
    vehicle_id = models.AutoField(primary_key=True)
    vehicle_type = models.CharField(
        max_length=50,
        choices=[
            ("Bus", "Bus"),
            ("Van", "Van"),
            ("Car", "Car"),
            ("Truck", "Truck"), 
            ("Jeepney", "Jeepney"),
            ("Other", "Other"),
        ],
        default="Bus"
    )
    vehicle_name = models.CharField(max_length=20, unique=True)
    plate_number = models.CharField(max_length=20, unique=True)

    manufacturer = models.CharField(max_length=100, blank=True, null=True)
    year = models.PositiveIntegerField(blank=True, null=True)

    # Capacity & Specs
    seat_capacity = models.PositiveIntegerField(blank=True, null=True)

    # Documents
    registration_number = models.CharField(max_length=50, unique=True)
    registration_expiry = models.DateField(blank=True, null=True)


    # Status
    is_active = models.BooleanField(default=True)
    date_registered = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Plate No. {self.plate_number} || Vehicle Type:  {self.vehicle_type} || Capacity: {self.seat_capacity}"


class Trip_Table(models.Model):
    trip_id = models.AutoField(primary_key=True)
    trip_name = models.CharField(max_length=100)
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    departure_time = models.DateTimeField(
        null=False,
        blank=False,
        help_text="Enter the exact departure date and time"
    )
    
    driver_id = models.ForeignKey(
        Driver_Table,
        on_delete=models.CASCADE,
        related_name="driver_trips",
        null=True,
        blank=True
    )
    vehicle_id = models.ForeignKey(
        Vehicle_Table,
        on_delete=models.CASCADE,
        related_name="vehicle_trips",
        null=False,
        blank=False
    )

    def __str__(self):
        driver_name = f"{self.driver_id.first_name} {self.driver_id.last_name}" if self.driver_id else "No Driver"
        vehicle_name = self.vehicle_id.vehicle_name if self.vehicle_id else "No Vehicle"

        return (
                f"Trip: {self.trip_name} | "
                f"Vehicle: {vehicle_name} | "
                f"Seats: {self.vehicle_id.seat_capacity} | "
                f"Route: {self.origin} → {self.destination} "
            )

    
class Ticket_Table(models.Model):
    ticket_id = models.AutoField(primary_key=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    tickets_quantity = models.IntegerField(default=0)
    
    trip_id = models.ForeignKey(
        Trip_Table,
        on_delete=models.CASCADE,
        related_name="tickets",
        null=True, 
        blank=True
    )

    def clean(self):
        from django.core.exceptions import ValidationError
        
        # Use trip_id to match your field name
        if self.trip_id:
            total_tickets = (
                Ticket_Table.objects.filter(trip_id=self.trip_id)
                .exclude(pk=self.pk)  # exclude current record when editing
                .aggregate(total=models.Sum("tickets_quantity"))["total"] or 0
            )
            
            # Use seat_capacity to match your Vehicle_Table field name
            vehicle_capacity = self.trip_id.vehicle_id.seat_capacity
            
            # Handle None capacity (since your field allows null=True)
            if vehicle_capacity is None:
                raise ValidationError({
                    "trip_id": "Vehicle capacity is not set for this trip's vehicle."
                })
            
            available_seats = vehicle_capacity - total_tickets
            
            if self.tickets_quantity > available_seats:
                raise ValidationError({
                    "tickets_quantity": f"Only {available_seats} seats available for this trip."
                })
            
            # Add validation for positive quantity
            if self.tickets_quantity <= 0:
                raise ValidationError({
                    "tickets_quantity": "Ticket quantity must be greater than 0."
                })

    def save(self, *args, **kwargs):
        # Always run validation before saving
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        trip_name = self.trip_id.trip_name if self.trip_id else "No Trip"
        return f"Ticket {self.ticket_id} - {self.price} PHP - (QTY: {self.tickets_quantity}) (Trip: {trip_name})"