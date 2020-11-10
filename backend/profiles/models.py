import datetime
import os


from django.db import models


# image 업로드시 파일 이름 변경하기
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
        profiles/img/{username}/{imagename}
        profiles/img/user4/user4-2020-11-05.jpg
    """
    now = datetime.datetime.now()

    path = "profiles/img/{username}/{imagename}".format(
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
    GENDER = (
        ('F', 'F'),
        ('M', 'M')
    )
    author = models.ForeignKey('user.User', on_delete=models.CASCADE)
    profile_img = models.ImageField(
        upload_to=user_directory_path, null=True, blank=True)
    profile_region = models.CharField(
        max_length=100, blank=True, choices=REGION)
    profile_gender = models.CharField(max_length=30, choices=GENDER)

    def __str__(self):
        return str(self.author)+'_profiles'
