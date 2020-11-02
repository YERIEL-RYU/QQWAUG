from django.db import models


class User(models.Model):
    user_id = models.CharField(max_length=30, primary_key=True, unique=True)
    password = models.CharField(max_length=50)
    user_name = models.CharField(max_length=50)

    def __str__(self):
        return self.user_id
