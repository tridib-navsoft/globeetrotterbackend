from .models import *
from rest_framework import serializers

class CollegeUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollegeUser
        fields = ("__all__")
        extra_kwargs = {
            # 'college_password': {'write_only': True},
            "college_verify_code":{'write_only': True},
            "college_fcode":{'write_only': True}

        }

