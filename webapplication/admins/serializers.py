from .models import *
from rest_framework import serializers

class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminUser
        fields = ("__all__")
        extra_kwargs = {
            'user_password': {'write_only': True}

        }