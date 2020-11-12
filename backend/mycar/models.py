from django.db import models


class Mycar(models.Model):
    CHOICE = (
        ('Gasoline', 'Gasoline'),
        ('Diesel', 'Diesel'),
        ('Gas', 'Gas')
    )
    userid = models.CharField(max_length=255, null=False, blank=False)
    car_company = models.CharField(max_length=100, null=True, blank=True)
    car_name = models.CharField(max_length=100, null=True, blank=True)
    car_old = models.IntegerField(null=True, blank=True)
    car_oil = models.CharField(
        max_length=100, null=True, blank=True, choices=CHOICE)
    car_number = models.CharField(max_length=100, null=True, blank=True)

    objects = models.Manager()

    def __str__(self):
        return self.userid+"_"+self.car_number
