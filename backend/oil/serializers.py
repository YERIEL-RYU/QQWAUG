from rest_framework import serializers
from .models import Oil


class OilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Oil
        fields = "__all__"
