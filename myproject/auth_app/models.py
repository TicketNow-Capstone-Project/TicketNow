from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.validators import RegexValidator

class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('The Username must be set')
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, password, **extra_fields)

class CustomUser(AbstractUser):
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
        message="Phone number must be entered in the format: '09169464899'. Up to 15 digits allowed."
    )
    
    phone = models.CharField(
        validators=[phone_regex],
        max_length=17,
        blank=False,
        unique=True
    )
    address = models.TextField(max_length=500, blank=False)
    
    # Custom fields to match React form
    firstname = models.CharField(max_length=30, blank=False, verbose_name='first name')
    lastname = models.CharField(max_length=30, blank=False, verbose_name='last name')
    
    # Remove the original fields
    first_name = None
    last_name = None
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['firstname', 'lastname', 'phone', 'address']
    
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_set',
        blank=True
    )
    
    def get_full_name(self):
        return f"{self.firstname} {self.lastname}".strip()
    
    def get_short_name(self):
        return self.firstname
    
    def __str__(self):
        return self.username