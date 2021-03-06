
from django.contrib import admin
from .models import EnginOil


@admin.register(EnginOil)
class EnginOilAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'center', 'change_km', 'change_date', 'image_tag','enginoil_img', 'userid', 
    ]
    list_filter = ['center', 'userid']
    search_fields = ['center', 'change_date', 'userid']
    list_per_page = 30
