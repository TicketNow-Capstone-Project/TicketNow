from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'email', 'status', 'is_staff', 'is_superuser']
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('address', 'phone', 'status')}),
    )

# This line was missing - you need to register your CustomUserAdmin
admin.site.register(CustomUser, CustomUserAdmin)