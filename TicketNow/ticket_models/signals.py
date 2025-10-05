# ticket_models/signals.py
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import Bookings_Table, Ticket_Table

@receiver(pre_save, sender=Bookings_Table)
def update_ticket_quantity(sender, instance, **kwargs):
    if not instance.pk:
        # New booking, do nothing here; post_save will handle it
        return

    try:
        old_instance = sender.objects.get(pk=instance.pk)
    except sender.DoesNotExist:
        return

    ticket = instance.ticket
    if not ticket:
        return

    # Status changed
    # Cancelled -> return tickets
    if old_instance.status in ['CONFIRMED', 'COMPLETED'] and instance.status == 'CANCELED':
        ticket.tickets_quantity += old_instance.quantity
        ticket.save()

    # Confirmed -> reduce tickets
    elif old_instance.status in ['PENDING', 'CANCELED'] and instance.status in ['CONFIRMED', 'COMPLETED']:
        ticket.tickets_quantity -= instance.quantity
        ticket.save()

@receiver(post_save, sender=Bookings_Table)
def handle_new_booking(sender, instance, created, **kwargs):
    if created:
        ticket = instance.ticket
        if instance.status in ['CONFIRMED', 'COMPLETED']:
            ticket.tickets_quantity -= instance.quantity
            ticket.save()
