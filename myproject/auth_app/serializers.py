from rest_framework import serializers
from .models import CustomUser
import re
        
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, style={'input_type': 'password'})
    
    class Meta:
        model = CustomUser
        fields = ('username', 'firstname', 'lastname', 'phone', 'address', 'password')
        extra_kwargs = {
            'firstname': {'required': True, 'allow_blank': False},
            'lastname': {'required': True, 'allow_blank': False},
            'phone': {'required': True, 'allow_blank': False},
            'address': {'required': True, 'allow_blank': False},
        }
    
    def validate_username(self, value):
        if len(value) < 3:
            raise serializers.ValidationError("Username must be at least 3 characters long")
        return value
    
    def validate_phone(self, value):
        # Allow Philippine format: 09xxxxxxxxx or +639xxxxxxxxx
        phone_pattern = r'^(\+63|0)9\d{9}$'
        if not re.match(phone_pattern, value):
            raise serializers.ValidationError("Phone number must be in Philippine format: 09169464899 or +639169464899")
        return value
    
    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long")
        return value
    
    def create(self, validated_data):
        try:
            user = CustomUser.objects.create_user(
                username=validated_data['username'],
                password=validated_data['password'],
                firstname=validated_data['firstname'],
                lastname=validated_data['lastname'],
                phone=validated_data['phone'],
                address=validated_data['address']
            )
            return user
        except Exception as e:
            raise serializers.ValidationError(f"Error creating user: {str(e)}")