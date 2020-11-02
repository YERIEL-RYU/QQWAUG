from django.db import models


# Create your models here.
class posts(models.Model):
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=300)
    writer = models.CharField(max_length=100)

    def __str__(self):
        return self.title
