from django.db import models


class EnginOil(models.Model):
    author = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    change_date = models.DateField(null=False)
    enginoil_img = models.ImageField(blank=True, upload_to='enginoil/img')
    center = models.CharField(max_length=100, null=False)
    change_km = models.IntegerField(null=False)

    def __str__(self):
        return str(self.author)+"_"+str(self.change_date)
