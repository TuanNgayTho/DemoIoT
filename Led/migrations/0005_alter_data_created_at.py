# Generated by Django 4.0.2 on 2023-05-27 07:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Led', '0004_data_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='data',
            name='created_at',
            field=models.DateTimeField(),
        ),
    ]
