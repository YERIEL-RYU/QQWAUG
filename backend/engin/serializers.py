from rest_framework import serializers
from .models import EnginOil


class EnginOilSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnginOil
        fields = "__all__"
