# Generated by Django 2.2.6 on 2019-10-05 22:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pins', '0003_auto_20191005_1553'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pin',
            name='description',
            field=models.CharField(max_length=50),
        ),
    ]
