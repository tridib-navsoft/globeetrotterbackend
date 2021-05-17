from rest_framework import generics
from django.core.paginator import Paginator
from ..auth import JWTAuthenticationAdmin
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
import random
from django.core.mail import EmailMultiAlternatives
from django.contrib.sites.shortcuts import get_current_site

from werkzeug.security import generate_password_hash,check_password_hash

class CollegeListView(generics.ListAPIView):
    authentication_classes = (JWTAuthenticationAdmin,)
    def post(self, request):
        size = request.data.get("page_size")
        page =request.data.get("page_number")
        college_list=CollegeUser.objects.filter(is_deleted="n").order_by("-college_id")
        paginator = Paginator(college_list, size)
        resources = paginator.get_page(page)
        college_serializer=CollegeUserSerializer(resources, many=True)
        output=college_serializer.data
        columns=[
        'select',
        'college_name',
       'representative_name',
       'representative_email',
       'representative_phone',
       'representative_status',
       'action']
        for element in output:
            element["id"]=element["college_id"]
            element["status"]=element["representative_status"]
            element["representative_name"]=element["college_represent_fname"]+" "+element["college_represent_lname"]
            element["password"]=element["college_password"]
            element["edit"]="fa fa-pencil"
            element["delete"]="fa fa-trash-o"
        return Response({"status":200,"columns":columns,"data":output})


class CollegeAddEdit(APIView):
    authentication_classes = (JWTAuthenticationAdmin,)
    def post(self,request):
        college_represent_fname=request.data.get("college_represent_fname")
        college_represent_lname=request.data.get("college_represent_lname")
        representative_email=request.data.get("representative_email")
        representative_phone=request.data.get("representative_phone")
        college_name=request.data.get("college_name")
        user_password=request.data.get("college_password")
        representative_email=representative_email.lower()
        random_otp = random.sample(range(2000, 8000), 1)
        user_exists=CollegeUser.objects.filter(representative_email=representative_email)
        if user_exists:
             return Response({"status":status.HTTP_409_CONFLICT, "message":"The email_id is already associated"})
        college_save=CollegeUser(representative_email=representative_email,college_represent_fname=college_represent_fname,college_represent_lname=college_represent_lname,college_name=college_name,username=representative_email,college_password=user_password)
        admin=AdminUser.objects.get(user_id=self.request.user.user_id)
        college_save.added_by_id=admin.user_id
        college_save.representative_phone=representative_phone
        college_save.college_verify_code=random_otp[0]
        college_save.representative_status=request.data.get("representative_status")
        college_save.save()
        # protocol = "http/"
        # web_url = protocol + request.get_host()
        # post_url = web_url + "/auth/users/activate/"
        subject, from_email, to = 'Verify your Mail', 'silvia.sanyal@navsoft.in', college_save.representative_email
        # message = "Your Forget Code is " + str(random_otp[0])representative_status
        html_content = 'Hi' + ' ' + college_save.college_represent_fname + ',' + '<br><br>Your Verification code is ' + ' : ' + str(random_otp[0])
        text_content = 'Verify your Mail'
        msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        return Response({"status": 200, "message": "The college details have been saved"})

    def put(self,request):
        try:
            college_edit=CollegeUser.objects.get(college_id=request.data.get("college_id"))
            college_edit.representative_email=request.data.get("representative_email").lower()
            college_edit.college_represent_fname=request.data.get("college_represent_fname")
            college_edit.college_represent_lname=request.data.get("college_represent_lname")
            college_edit.representative_phone=request.data.get("representative_phone")
            college_edit.college_name= request.data.get("college_name")
            college_edit.college_password= request.data.get("college_password")
            college_edit.representative_status=request.data.get("representative_status")
            college_edit.save()
            return Response({"status": 200, "message": "The College Details has been Edited"})
        except:
            return Response({"status": 401, "message": "The College doesn't exist"})


class CollegeDelete(APIView):
    authentication_classes = (JWTAuthenticationAdmin,)
    def put(self,request):
        try:
            college_delete=CollegeUser.objects.get(college_id=request.data.get("college_id"))
            college_delete.is_deleted="y"
            college_delete.save()
            return Response({"status": 200, "message": "The College has been Deleted"})
        except:
            return Response({"status": 401, "message": "The College doesn't exist"})

class CollegeDetail(APIView):
    # authentication_classes = (JWTAuthenticationAdmin,)
    def post(self,request):
        try:
            college_details = CollegeUser.objects.get(college_id=request.data.get("college_id"),is_deleted="n")
            college_serializer = CollegeUserSerializer(college_details)
            output=college_serializer.data
            return Response({"status": 200, "data":output, "message": "Details of the college"})

        except:
            return Response({"status":status.HTTP_404_NOT_FOUND, "message":"The college is either deleted or is not registered"})

# class CollegeStatusChange(APIView):
#     def put(self,request):
#         try:
#             college_status=CollegeUser.objects.get(college_id=request.data.get("college_id"))
#             if (college_status.representative_status==True):
#                 college_status.representative_status= False
#             else:
#                 college_status.representative_status = True
#             college_status.save()
#             return Response({"status": 200, "message": f'The College status has been set to {college_status.representative_status}'})
#         except:
#             return Response({"status": 401, "message": "The College doesn't exi
