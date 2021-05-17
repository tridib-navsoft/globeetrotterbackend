from django.urls import path, include
from .views import *
# from ..admin_view.views import *
urlpatterns = [
  path('login',SuperAdminLoginView.as_view(), name="admin login"),

  path('forgotpassword',ForgotPassSendMail.as_view(), name="admin login"),
  path('receive/forgot/code',ReceiveForgotCode.as_view(), name="receive code"),
  path('change/forgot/pass',ChangePassForgotAdmin.as_view(), name="change password"),

    ]
