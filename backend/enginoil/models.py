from django.db import models


class EnginOil(models.Model):
    author = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    change_data = models.DateField(null=False)
    enginoil_img = models.ImageField(blank=True, upload_to='enginoil/img')
    center = models.CharField(max_length=100, null=False)
    change_km = models.IntegerField(null=False)
