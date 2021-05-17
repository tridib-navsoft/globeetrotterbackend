import jwt
from rest_framework import authentication, exceptions
# from django.contrib.auth.models import User
from .admins.models import *



class JWTAuthenticationAdmin(authentication.BaseAuthentication):

    def authenticate(self, request):
        auth_data = authentication.get_authorization_header(request)

        if auth_data == b'':
            raise exceptions.AuthenticationFailed('Please provide the token,login')

        token = auth_data.decode('utf-8')
        try:
            payload = jwt.decode(token, 'secret')
            try:
                user = AdminUser.objects.get(user_id=payload['user'])
                return (user, token)
            except AdminUser.DoesNotExist:raise exceptions.AuthenticationFailed('Your token is invalid,login')
        # print(payload)

        except jwt.DecodeError as identifier:
            raise exceptions.AuthenticationFailed('Your token is invalid,login')
        except jwt.ExpiredSignatureError as identifier:
            raise exceptions.AuthenticationFailed('Your token is expired,login')


