from django.db import models
from qqing.common import user_directory_path
from django.utils.html import format_html


class EnginOil(models.Model):
    id = models.AutoField(primary_key=True)
    userid = models.CharField(max_length=255, null=False, blank=False)
    change_date = models.DateField(null=False)
    enginoil_img = models.ImageField(
        blank=True, null=True, upload_to=user_directory_path)
    center = models.CharField(max_length=100, null=False)
    change_km = models.IntegerField(null=False)

    objects = models.Manager()

    def __str__(self):
        return "enginoil"+str(self.userid)+"_"+str(self.change_date)

    def image_tag(self):
        if self.enginoil_img:
            return format_html('<img src="{}" height="50"/>'.format(self.enginoil_img.url))
        return format_html('<img src="{}" height="50"/>'.format("https: // missioninfra.net/img/noimg/noimg_4x3.gif"))
    image_tag.short_description = 'Enginoil'
