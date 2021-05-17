from .models import *
from rest_framework import serializers
# from djoser.serializers import TokenCreateSerializer


class RecruiterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecruiterUser
        fields = ("__all__")
        extra_kwargs = {
            # 'recruiter_password': {'write_only': True},
            "recruiter_verify_code":{'write_only': True},
            "recruiter_fcode":{'write_only': True}
        }