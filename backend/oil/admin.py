from django.contrib import admin
from .models import Oil


@admin.register(Oil)
class OilAdmin(admin.ModelAdmin):
    list_display = ['id', 'oil_date', 'oil_liter',
                    'oil_price', 'oil_total', 'author']
    list_filter = ['oil_date', 'author']
    search_fields = ['oil_date', 'author']
