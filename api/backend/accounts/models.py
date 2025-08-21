from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    firstname = models.CharField(max_length=150)
    lastname = models.CharField(max_length=150)
    address = models.TextField(blank=True, null=True)
    phonenumber = models.CharField(max_length=20, blank=True, null=True)

    STATUS_CHOICES = [
        ('admin', 'Admin'),
        ('staff', 'Staff'),
        ('user', 'User'),
    ]

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='user',
        blank=True,
        null=True
    )

    class Meta:
        db_table = 'ticket_users'  # Custom table name
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.username