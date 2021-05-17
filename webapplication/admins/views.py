from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.validators import validate_email
from .serializers import *
import jwt
import datetime
import random
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from werkzeug.security import generate_password_hash,check_password_hash
from django.views.decorators.csrf import csrf_exempt
# from django.views.decorators.csrf import ensure_csrf_cookie

#

class SuperAdminLoginView(APIView):
    #permission_classes= [permissions.IsAuthenticated, TokenHasReadWriteScope]
    def post(self, request):
        # username=request.data.get("username")
        # password=request.data.get("password")
        # username= username.lower()
        try:
            user=AdminUser.objects.get(username=request.data.get("username").lower(),user_status=True)
            if check_password_hash(user.user_password, request.data.get("password")):
                token = jwt.encode({"user": user.user_id, "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=3000)},'secret', algorithm='HS256')
                if user.user_token is None:
                    user.user_token=token.decode('UTF-8')
                    user.save()
                user_serializer=AdminUserSerializer(user)
                output=user_serializer.data

                return Response({"status": 200, "data":output, "message":"You are logged in", "token": token.decode('UTF-8')})
            else:
                return Response({"status": 401, "message":"The Password id Incorrect"})
        except:
            return Response({"status": 401, "message": "The Email Address doesn't exist"})


class ForgotPassSendMail(APIView):
    def post(self, request):
        user_email=request.data.get("user_email")
        random_otp = random.sample(range(2000, 8000), 1)
        try:
            user= AdminUser.objects.get(user_email=user_email,user_status=True)
            user.user_fcode=random_otp[0]
            user.save()
            # user_name=user.user_fname+" "+user.user_lname
            output={"user_id":user.user_id, "user_email": user.user_email }
            subject, from_email, to = 'Update Password', 'silvia.sanyal@navsoft.in', user.user_email
            # message = "Your Forget Code is " + str(random_otp[0])
            html_content = 'Hi' + ' ' + user.user_fname+ ',' + '<br><br>Your password reset code is ' + ' : ' + str(random_otp[0])
            text_content = 'Update Password'
            msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            return Response({"status": 200, "data":output, "message":"The Reset Password has been sent to your mail"})
        except:
            return Response({"status": 401, "message": "The Email Address is not Registered"})

class ReceiveForgotCode(APIView):

    def post(self, request):
        # user_fcode=
        # user_id=
        try:
            user=AdminUser.objects.get(user_id=request.data.get("user_id"),user_status=True)
            if (int(user.user_fcode)==(request.data.get("user_fcode"))):
                return Response({"status":200, "message":"The Forgot code has matched"})
            else:
                return Response({"status": 404, "message": "The Code doesn't Match"})
        except:
            return Response({"status": 401, "message": "The user not found"})

class ChangePassForgotAdmin(APIView):
    def post(self,request):
        try:
            user=AdminUser.objects.get(user_id=request.data.get("user_id"),user_status=True)
            print("abc")
            user.user_password=generate_password_hash(request.data.get("user_password"), method='sha256')

            user.reset_password_times=user.reset_password_times+1
            user.save()
            return Response({"status":200, "message":"New password has been Updated"})
        except:
            return Response({"status": 401, "message": "The user not found"})


# class AdminAdd(APIView):
#     def post(self, request):
#         try:














