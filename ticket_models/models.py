from django.db import models

# Create your models here.

class Trip_Table(models.Model):
    trip_id = models.AutoField(primary_key=True)
    trip_name = models.CharField(max_length=100)
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)

    def __str__(self):
        return f"Trip ID {self.trip_id} - Trip Name: {self.trip_name} ({self.origin} → {self.destination})"
    
class Ticket_Table(models.Model):
    ticket_id = models.AutoField(primary_key=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    appointed_schedule = models.DateTimeField()
    tickets_qty = models.IntegerField(default=0)
    

    trip_id = models.ForeignKey (
        Trip_Table,
        on_delete = models.CASCADE,
        related_name = "tickets",
        null=True,  # allow blank values temporarily
        blank=True
    )

    def __str__(self):
        return f"Ticket {self.ticket_id} - {self.price} PHP - {self.appointed_schedule.strftime('%Y-%m-%d %H:%M')} (QTY: {self.tickets_qty})(Trip: {self.trip_id.trip_name})"