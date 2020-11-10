from django.contrib import admin
from .models import User
from .models import Profiles
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.admin import UserAdmin


@admin.register(User)
class UsersAdmin(UserAdmin):
    list_display = ['userid', 'username', 'useremail']
    list_display_links = ['userid', 'username']
    list_filter = ['is_superuser']
    fieldsets = (
        (None, {'fields': ('userid', 'password')}),
        (_('Personal info'), {'fields': ('username', 'useremail',
                                         )}),
        (_('Permissions'), {'fields': ('grade', 'is_active')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )


@admin.register(Profiles)
class ProfilesAdmin(admin.ModelAdmin):
    list_display = ['id', 'author',
                    'profile_region', 'image_tag', 'profile_img']
