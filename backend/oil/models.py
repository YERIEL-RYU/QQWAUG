from django.db import models


class Oil(models.Model):
    author = models.ForeignKey('user.User', on_delete=models.CASCADE)
    oil_date = models.DateField(auto_now=True, null=False, blank=False)
    oil_liter = models.IntegerField(null=False, blank=False)
    oil_price = models.IntegerField(null=False, blank=False)
    oil_total = models.IntegerField(null=False, blank=False)

    def __str__(self):
        return str(self.author)+"_"+str(self.oil_date)
