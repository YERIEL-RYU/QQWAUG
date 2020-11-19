from django.db import models


class Oil(models.Model):
    userid = models.CharField(max_length=255, null=False, blank=False)
    oil_date = models.DateField(auto_now=True, null=False, blank=False)
    oil_liter = models.IntegerField(null=False, blank=False)
    oil_price = models.IntegerField(null=False, blank=False)
    oil_total = models.IntegerField(null=False, blank=False)

    def __str__(self):
        return self.userid+"_"+str(self.oil_date)
