from rest_framework import serializers
from .models import Mycar


class MycarSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['author', 'car_company', 'car_name',
                  'car_old', 'car_oil', 'car_number', ]
        model = Mycar
