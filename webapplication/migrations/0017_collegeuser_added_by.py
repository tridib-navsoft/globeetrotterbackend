# Generated by Django 3.2 on 2021-05-06 18:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('webapplication', '0016_collegeuser'),
    ]

    operations = [
        migrations.AddField(
            model_name='collegeuser',
            name='added_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='webapplication.adminuser'),
        ),
    ]