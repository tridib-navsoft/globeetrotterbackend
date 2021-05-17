# Generated by Django 3.2 on 2021-05-05 06:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapplication', '0011_auto_20210504_1651'),
    ]

    operations = [
        migrations.AlterField(
            model_name='educationaldetails',
            name='edu_details_status',
            field=models.CharField(choices=[('true', 'true'), ('false', 'false')], max_length=10),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_status',
            field=models.CharField(choices=[('true', 'true'), ('false', 'false')], max_length=10),
        ),
        migrations.AlterField(
            model_name='usertype',
            name='usertype_status',
            field=models.CharField(choices=[('true', 'true'), ('false', 'false')], max_length=10),
        ),
    ]
