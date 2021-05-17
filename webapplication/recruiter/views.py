from rest_framework import generics
from django.core.paginator import Paginator
from ..auth import JWTAuthenticationAdmin
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
import random
from django.core.mail import EmailMultiAlternatives
import jwt
import datetime
from werkzeug.security import generate_password_hash,check_password_hash
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse

class RecruiterListView(generics.ListAPIView):
    authentication_classes = (JWTAuthenticationAdmin,)
    def post(self, request):
        size = request.data.get("page_size")
        page =request.data.get("page_number")
        recuiter_list=RecruiterUser.objects.filter(is_deleted="n").order_by("-recruiter_id")
        paginator = Paginator(recuiter_list, size)
        resources = paginator.get_page(page)
        recuiter_serializer=RecruiterUserSerializer(resources, many=True)
        output=recuiter_serializer.data
        columns=[
        'select',
        'recruiter_name',
       'recruiter_company',
       'recruiter_email',
       'recruiter_phone',
       'recruiter_status',
       'action']
        for element in output:
            element["id"] = element['recruiter_id']
            element["status"] = element['recruiter_status']
            element["recruiter_name"]=element["recruiter_fname"]+" "+element["recruiter_lname"]
            element["edit"]="fa fa-pencil"
            element["delete"]="fa fa-trash-o"
        return Response({"status":200,"columns":columns,"data":output})


class RecruiterAddEdit(generics.ListAPIView):
    authentication_classes = (JWTAuthenticationAdmin,)
    def post(self,request):
        random_otp = random.sample(range(2000, 8000), 1)
        user_exists=RecruiterUser.objects.filter(recruiter_email=request.data.get("recruiter_email").lower())
        if user_exists:
             return Response({"status":status.HTTP_409_CONFLICT, "message":"The email_id is already associated"})
        recruiter_save=RecruiterUser(recruiter_email=request.data.get("recruiter_email").lower(),recruiter_fname=request.data.get("recruiter_fname"),recruiter_lname=request.data.get("recruiter_lname"),recruiter_company=request.data.get("recruiter_company"),username=request.data.get("recruiter_email").lower(),recruiter_password=request.data.get("recruiter_password"))
        admin=AdminUser.objects.get(user_id=self.request.user.user_id)
        recruiter_save.added_by_id=admin.user_id
        recruiter_save.recruiter_phone=request.data.get("recruiter_phone")
        recruiter_save.recruiter_verify_code=random_otp[0]
        recruiter_save.save()
        token = jwt.encode({"user": recruiter_save.recruiter_id, "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=3000)},'secret', algorithm='HS256')
        current_site=get_current_site(request).domain
        relativeLink=reverse("email-verify")
        absurl='http://'+current_site+relativeLink+"?token="+token.decode('UTF-8')

        subject, from_email, to = 'Verify your Mail', 'silvia.sanyal@navsoft.in', recruiter_save.recruiter_email
        # message = "Your Forget Code is " + str(random_otp[0])representative_status
        html_content = 'Hi' + ' ' + recruiter_save.recruiter_fname + ',' + '<br><br> Use the Link to activate your account <br>'+ absurl
        text_content = 'Verify your Mail'
        msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        return Response({"status": 200, "message": "The Recruiter's details have been saved"})
#?user="+recruiter_save.recruiter_id+"
    def put(self,request):
        try:
            recruiter_edit=RecruiterUser.objects.get(recruiter_id=request.data.get("recruiter_id"))
            recruiter_edit.recruiter_email=request.data.get("recruiter_email").lower()
            recruiter_edit.recruiter_fname=request.data.get("recruiter_fname")
            recruiter_edit.recruiter_lname=request.data.get("recruiter_lname")
            recruiter_edit.recruiter_phone=request.data.get("recruiter_phone")
            recruiter_edit.recruiter_company= request.data.get("recruiter_company")
            recruiter_edit.recruiter_status=request.data.get("recruiter_status")
            recruiter_edit.save()
            return Response({"status": 200, "message": "The Recruiter's Details has been Edited"})
        except:
            return Response({"status": 401, "message": "The Recruiter doesn't exist"})

class RecruiterDelete(APIView):
    authentication_classes = (JWTAuthenticationAdmin,)
    def put(self,request):
        try:
            recruiter_delete=RecruiterUser.objects.get(recruiter_id=request.data.get("recruiter_id"))
            recruiter_delete.is_deleted="y"
            recruiter_delete.save()
            return Response({"status": 200, "message": "The Recruiter has been Deleted"})
        except:
            return Response({"status": 401, "message": "The Recruiter doesn't exist"})



class VerifyEmail(generics.GenericAPIView):
    def get(self,request):
        token=request.GET.get("token")
        try:
         payload = jwt.decode(token, 'secret')
         recruiter=RecruiterUser.objects.get(recruiter_id=payload['user'])
         recruiter.recruiter_auth_stat=True
         recruiter.save()
         return Response({"status":status.HTTP_200_OK, "message":"Email is successfully verified"})
        except  jwt.ExpiredSignature as identifier:
            return Response({"status": status.HTTP_400_BAD_REQUEST, "message":"Activation Link Expired"})
        except jwt.exceptions.DecodeError as identifier:
            return Response({"status": status.HTTP_400_BAD_REQUEST, "message": "Invalid Token"})