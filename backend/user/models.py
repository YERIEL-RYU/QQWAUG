import datetime
import os

from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.html import format_html


from .manager import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    GRADE = (
        ('SUPERUSER', 'SUPERUSER'),
        ('USER', 'USER')
    )
    userid = models.CharField(
        max_length=255,
        default='',
        null=False,
        blank=False,
        unique=True
    )
    username = models.CharField(
        verbose_name='사용자 이름',
        max_length=255,
        default='',
        null=False,
        blank=False,
    )
    useremail = models.EmailField(
        verbose_name='email',
        max_length=255,
    )
    grade = models.CharField(
        max_length=300,
        null=True,
        choices=GRADE,
        default='USER'
    )
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'userid'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

    def __str__(self):
        return self.userid


def set_imagename_format(now, instance, filename):
    """
    image format setting
    e.g)
        {username}-{date}{extension}
    """
    print(os.path.splitext(filename)[1])
    return "{username}-{date}{extension}".format(
        username=instance.userid,
        date=str(now.date()),
        extension=os.path.splitext(filename)[1],
    )


def user_directory_path(instance, filename):
    """
    image upload dircetory setting
    e.g)
        user/img/{username}/{imagename}
        user/img/user4/user4-2020-11-05.jpg
    """
    now = datetime.datetime.now()
    path = "user/img/{username}/{imagename}".format(
        username=instance.userid,
        imagename=set_imagename_format(now, instance, filename)
    )
    return path


class Profiles(models.Model):
    REGION = (
        ('', '선택안함'),
        ('서울', '서울'),
        ('인천', '인천'),
        ('부산', '부산'),
        ('기타', '기타')
    )
    GENDER = (
        ('', '선택안함'),
        ('여성', '여성'),
        ('남성', '남성')
    )
    userid = models.CharField(max_length=255, null=False, blank=False)
    profile_img = models.ImageField(
        upload_to=user_directory_path, blank=True, null=True)
    profile_region = models.CharField(
        max_length=100, blank=True, choices=REGION, null=True,)
    profile_gender = models.CharField(
        max_length=100, choices=GENDER, null=True, blank=True,
    )
    objects = models.Manager()

    def __str__(self):
        return self.userid + '_profiles'

    def image_tag(self):
        if self.profile_img:
            return format_html('<img src="{}" height="50"/>'.format(self.profile_img.url))
        return format_html('<img src="{}" height="50"/>'.format("https: // missioninfra.net/img/noimg/noimg_4x3.gif"))
    image_tag.short_description = 'Profiles'
