from django.contrib import admin
from .models import Mycar


@admin.register(Mycar)
class MycarAdmin(admin.ModelAdmin):
    list_display = ['id', 'car_company', 'car_name',
                    'car_old', 'car_oil', 'car_number', 'author']
    list_filter = ['car_company', 'car_name', 'car_old', 'car_oil', 'author']
    search_fields = ['car_company', 'car_name',
                     'car_old', 'car_oil', 'car_number', 'author']
