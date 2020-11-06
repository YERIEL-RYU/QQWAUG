import datetime
import os
import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from .manager import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    objects = UserManager()
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
    secret = models.UUIDField(default=uuid.uuid4)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    USERNAME_FIELD = 'userid'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.userid


def set_imagename_format(now, instance, filename):
    """
    image format setting
    e.g)
        {username}-{date}{extension}
    """
    return "{username}-{date}{extension}".format(
        username=instance.author,
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
        username=instance.author,
        imagename=set_imagename_format(now, instance, filename)
    )
    return path


class Profiles(models.Model):
    REGION = (
        ('', '선택안함'),
        ('seoul', '서울'),
        ('incheon', '인천'),
        ('busan', '부산')
    )
    author = models.ForeignKey('user.User', on_delete=models.CASCADE)
    profile_img = models.ImageField(
        upload_to=user_directory_path, null=True, blank=True)
    profile_region = models.CharField(
        max_length=100, blank=True, choices=REGION)

    def __str__(self):
        return str(self.author)+'_profiles'
