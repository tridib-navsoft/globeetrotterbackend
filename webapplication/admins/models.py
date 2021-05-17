from django.db import models

# Create your models here.

choice=(
    ("y","y"),
    ("n","n")
)

status_choice=(
    ("true","true"),
    ("false","false")
)

class UserType(models.Model):
    usertype_id=models.AutoField(auto_created=True,primary_key=True)
    usertype_name=models.CharField(max_length=20)
    usertype_status=models.CharField(max_length=10,choices=status_choice,default="true")
    # def __str__(self):
    #     return self.usertype_name

class AdminUser(models.Model):
    user_id=models.AutoField(auto_created = True,primary_key = True)
    user_fname = models.CharField(max_length=30, null=False)
    user_lname = models.CharField(max_length=30, null=False)
    user_email=models.EmailField()
    username=models.CharField(max_length=50, null=False)
    user_phone=models.CharField(max_length=20, null=True)
    user_password=models.CharField(max_length=100, null=False)
    reset_password_times=models.IntegerField(default=0)
    # user_type=models.ForeignKey(UserType,on_delete=models.CASCADE)
    user_token=models.CharField(max_length=255, null=True)
    user_fcode=models.CharField(max_length=10, null=True)
    user_verify_code=models.CharField(max_length=10, null=True)
    user_auth_stat=models.CharField(max_length=10, null=True)
    isSuper_admin=models.CharField(max_length=10, choices=choice)
    isSub_admin=models.CharField(max_length=10, choices=choice)
    user_status=models.BooleanField(default=True)



# class EducationalDetails(models.Model):
#     edu_id=models.AutoField(auto_created = True,primary_key = True)
#     user=models.ForeignKey(User,on_delete=models.CASCADE)
#     school_name=models.CharField(max_length=255, null=True)
#     college_name=models.CharField(max_length=255, null=True)
#     edu_details_status=models.CharField(max_length=10,choices=status_choice,default="true")

