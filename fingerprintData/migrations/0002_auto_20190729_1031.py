# Generated by Django 2.2.3 on 2019-07-29 08:31

from decimal import Decimal
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fingerprintData', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='product_description',
            field=models.TextField(default='A new product.', max_length=200),
        ),
        migrations.AddField(
            model_name='product',
            name='product_image',
            field=models.ImageField(default='static/vendor/img/no-img.jpg', upload_to='static/vendor/img/'),
        ),
        migrations.AlterField(
            model_name='product',
            name='product_name',
            field=models.CharField(max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='product_price',
            field=models.DecimalField(decimal_places=2, max_digits=8, validators=[django.core.validators.MinValueValidator(Decimal('0.01'))]),
        ),
        migrations.AlterField(
            model_name='type',
            name='type_description',
            field=models.CharField(max_length=200, unique=True),
        ),
    ]
