# Generated by Django 3.2 on 2021-05-07 08:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapplication', '0018_auto_20210507_1133'),
    ]

    operations = [
        migrations.AddField(
            model_name='collegeuser',
            name='representative_phone',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
    ]
