from ..admins.models import *
from django.db import models

choice=(
    ("y","y"),
    ("n","n")
)

class RecruiterUser(models.Model):
    recruiter_id = models.AutoField(auto_created=True, primary_key=True)
    recruiter_fname=models.CharField(max_length=100, null=False)
    recruiter_lname=models.CharField(max_length=100, null=False)
    recruiter_company=models.CharField(max_length=100, null=False)
    recruiter_email=models.EmailField(unique=True)
    recruiter_phone=models.CharField(max_length=50, null=False)
    username=models.CharField(max_length=50, null=False)
    recruiter_password=models.CharField(max_length=100, null=False)
    recruiter_fcode=models.CharField(max_length=100, null=True)
    recruiter_verify_code = models.CharField(max_length=10, null=True)
    recruiter_auth_stat=models.BooleanField(default=False, null=False)
    added_by=models.ForeignKey(AdminUser,on_delete=models.CASCADE, null=True)
    recruiter_status = models.BooleanField(default=True, null=False)
    company_logo=models.ImageField(null=True)
    is_deleted=models.CharField(max_length=10, choices=choice, default="n")

