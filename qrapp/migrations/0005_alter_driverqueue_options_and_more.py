# Generated by Django 5.2.4 on 2025-07-07 13:15

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('qrapp', '0004_driverqueue_departure_time_driverqueue_is_done'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='driverqueue',
            options={'ordering': ['departure_time']},
        ),
        migrations.AlterField(
            model_name='driverqueue',
            name='departure_time',
            field=models.DateTimeField(default=datetime.datetime(2025, 7, 7, 13, 15, 44, 126867, tzinfo=datetime.timezone.utc)),
            preserve_default=False,
        ),
    ]
