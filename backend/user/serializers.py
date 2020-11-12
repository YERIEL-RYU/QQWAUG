from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import update_last_login
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from .models import User, Profiles

User = get_user_model()
Profiles = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'userid', 'password', 'username']
        extra_kwargs = {'password': {'write_only': True}}


"""
    Register serializer
"""


class UserCreateSerializer(serializers.Serializer):

    userid = serializers.CharField(required=True)
    username = serializers.CharField(required=True)
    useremail = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)

    def create(self, validated_data):
        user = User.objects.create(
            userid=validated_data['userid'],
            username=validated_data['username'],
            useremail=validated_data['useremail'],
        )
        user.set_password(validated_data['password'])

        user.save()
        return user


"""
    login serializer
"""

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


"""
    Profile serializer
"""


class ProfileSerializer(serializers.Serializer):
    userid = serializers.CharField(required=True)
    profile_img = serializers.ImageField(required=False, use_url=True)
    profile_region = serializers.CharField(required=False)
    profile_gender = serializers.CharField(required=False)

    def create(self, validated_data):
        profile = Profiles.objects.create(
            userid=validated_data['userid'],
            profile_region=validated_data['profile_region'],
            profile_gender=validated_data['profile_gender'],
        )
        profile.save()
        return profile
