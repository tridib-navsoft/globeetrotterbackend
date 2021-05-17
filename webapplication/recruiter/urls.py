from django.urls import path, include
from .views import *

urlpatterns = [
path('recruiter/list', RecruiterListView.as_view(), name="recruiter list"),
path('recruiter/add/edit', RecruiterAddEdit.as_view(), name="recruiter list"),
path('recruiter/delete', RecruiterDelete.as_view(), name="recruiter delete"),
path('recruiter/email/verify', VerifyEmail.as_view(), name="email-verify"),

    ]