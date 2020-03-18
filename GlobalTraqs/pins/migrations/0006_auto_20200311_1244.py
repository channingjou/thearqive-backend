# Generated by Django 3.0.2 on 2020-03-11 19:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pins', '0005_auto_20200306_1024'),
    ]

    operations = [
        migrations.AddField(
            model_name='pin',
            name='lastEditDate',
            field=models.DateField(blank=True, null=True, verbose_name='lastEditDate'),
        ),
        migrations.AddField(
            model_name='pin',
            name='postDate',
            field=models.DateField(blank=True, null=True, verbose_name='postDate'),
        ),
        migrations.AlterField(
            model_name='pin',
            name='endDate',
            field=models.DateField(blank=True, null=True, verbose_name='endDate'),
        ),
        migrations.AlterField(
            model_name='pin',
            name='startDate',
            field=models.DateField(blank=True, null=True, verbose_name='startDate'),
        ),
    ]
