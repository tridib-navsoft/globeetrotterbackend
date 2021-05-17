from django.db import models
from ..admins.models import *
# Create your models here.

choice=(
    ("y","y"),
    ("n","n")
)

status_choice=(
    ("true","true"),
    ("false","false")
)


class CollegeUser(models.Model):
    college_id = models.AutoField(auto_created=True, primary_key=True)
    college_represent_fname=models.CharField(max_length=30, null=False)
    college_represent_lname=models.CharField(max_length=30, null=False)
    representative_email=models.EmailField()
    representative_phone=models.CharField(max_length=50, null=False)
    username=models.CharField(max_length=50, null=False)
    college_name=models.CharField(max_length=50, null=False)
    college_password=models.CharField(max_length=100, null=False)
    college_fcode=models.CharField(max_length=100, null=True)
    college_verify_code = models.CharField(max_length=10, null=True)
    college_auth_stat=models.BooleanField(default=True, null=False)
    added_by=models.ForeignKey(AdminUser,on_delete=models.CASCADE, null=True)
    representative_status = models.BooleanField(null=False)
    is_deleted=models.CharField(max_length=10, choices=choice, default="n")