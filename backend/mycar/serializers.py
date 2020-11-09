from rest_framework import serializers
from .models import Mycar
from user.serializers import UserSerializer


class MycarSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        fields = ['author', 'car_company', 'car_name',
                  'car_old', 'car_oil', 'car_number', ]
        model = Mycar
