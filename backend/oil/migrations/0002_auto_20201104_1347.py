# Generated by Django 3.1.3 on 2020-11-04 04:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('oil', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='oil',
            name='oil_date',
            field=models.DateField(auto_now=True),
        ),
    ]
