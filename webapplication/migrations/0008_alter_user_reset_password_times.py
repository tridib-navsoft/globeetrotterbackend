# Generated by Django 3.2 on 2021-04-30 12:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapplication', '0007_user_user_fcode'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='reset_password_times',
            field=models.CharField(default=0, max_length=30),
        ),
    ]