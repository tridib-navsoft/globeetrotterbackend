# Generated by Django 3.2 on 2021-04-30 06:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapplication', '0006_educationaldetails'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='user_fcode',
            field=models.CharField(max_length=10, null=True),
        ),
    ]
