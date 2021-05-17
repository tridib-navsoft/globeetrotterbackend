from django.contrib import admin
from .admins.models import *
from .college.models import *
from .recruiter.models import *
# Register your models here.

admin.site.register(AdminUser)
admin.site.register(UserType)
admin.site.register(CollegeUser)
admin.site.register(RecruiterUser)
