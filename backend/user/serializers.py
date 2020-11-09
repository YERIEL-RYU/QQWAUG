from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from rest_framework_jwt.serializers import JSONWebTokenSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'userid', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            userid=validated_data['userid'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class SignupSerializer(serializers.ModelSerializer):
    userid = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all())])
    username = serializers.CharField()
    useremail = serializers.CharField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('userid', 'username', 'useremail', 'password')
