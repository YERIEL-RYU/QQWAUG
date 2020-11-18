
from django.contrib import admin
from .models import EnginOil


@admin.register(EnginOil)
class EnginOilAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'center', 'change_km', 'change_date', 'enginoil_img', 'userid', 'image_tag'
    ]
    list_filter = ['center', 'userid']
    search_fields = ['center', 'change_date', 'userid']
    list_per_page = 30
