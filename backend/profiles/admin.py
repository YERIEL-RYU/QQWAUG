from django.contrib import admin
from .models import Profiles


@admin.register(Profiles)
class MycarAdmin(admin.ModelAdmin):
    list_display = ['id', 'profile_region', 'profile_img',
                    'author']
