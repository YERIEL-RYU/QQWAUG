from django.contrib import admin
from .models import EnginOil


@admin.register(EnginOil)
class EnginOilAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'center', 'change_km', 'change_date', 'enginoil_img', 'author',
    ]
    list_filter = ['center', 'author']
    search_fields = ['center', 'change_date', 'author']
    list_per_page = 30
