from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import update_last_login
from django.contrib.auth import authenticate, get_user_model
from .models import User

User = get_user_model()


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'userid', 'password']
#         extra_kwargs = {'password': {'write_only': True}}


# class SignupSerializer(serializers.ModelSerializer):
#     userid = serializers.CharField(
#         validators=[UniqueValidator(queryset=User.objects.all())])
#     username = serializers.CharField()
#     useremail = serializers.CharField()
#     password = serializers.CharField(write_only=True)

#     class Meta:
#         model = User
#         fields = ('userid', 'username', 'useremail', 'password')


JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER


class UserLoginSerializer(serializers.Serializer):
    userid = serializers.CharField()
    password = serializers.CharField(write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        userid = data.get('userid', None)
        password = data.get('password', None)
        user = authenticate(
            userid=userid, password=password)

        if user is None:
            return {
                'userid': 'None'
            }
        try:
            payload = JWT_PAYLOAD_HANDLER(user)
            jwt_token = JWT_ENCODE_HANDLER(payload)
            update_last_login(None, user)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                'User with given userid and password does not exists'
            )
        return {
            'userid': user.userid,
            'token': jwt_token,

        }
