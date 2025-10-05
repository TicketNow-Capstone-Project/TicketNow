from rest_framework import serializers
from auth_app.models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'firstname', 'lastname')
        read_only_fields = ('id',)