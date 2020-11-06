from django.contrib import admin
from .models import User
from .models import Profiles
from django.utils.translation import ugettext_lazy as _


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['userid', 'username', 'useremail']
    list_display_links = ['userid', 'username']
    list_filter = ['is_superuser']
    fieldsets = (
        (None, {'fields': ('userid', 'password')}),
        (_('Personal info'), {'fields': ('username', 'useremail',
                                         'last_login')}),
        (_('Permissions'), {'fields': ('grade', 'is_active')})
    )


@admin.register(Profiles)
class ProfilesAdmin(admin.ModelAdmin):
    list_display = ['id', 'author', 'profile_region', 'profile_img', ]
