# Generated by Django 3.2 on 2021-05-07 06:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('webapplication', '0017_collegeuser_added_by'),
    ]

    operations = [
        migrations.RenameField(
            model_name='collegeuser',
            old_name='college_email',
            new_name='representative_email',
        ),
        migrations.RenameField(
            model_name='collegeuser',
            old_name='college_status',
            new_name='representative_status',
        ),
    ]
