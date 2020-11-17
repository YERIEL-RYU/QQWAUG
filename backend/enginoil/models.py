from django.db import models


class EnginOil(models.Model):
    userid = models.CharField(max_length=255, null=False, blank=False)
    change_date = models.DateField(null=False)
    enginoil_img = models.ImageField(blank=True, upload_to='enginoil/img')
    center = models.CharField(max_length=100, null=False)
    change_km = models.IntegerField(null=False)

    def __str__(self):
        return "enginoil"+str(self.userid)+"_"+str(self.change_date)
