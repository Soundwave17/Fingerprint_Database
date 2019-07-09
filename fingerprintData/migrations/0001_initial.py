# Generated by Django 2.2.3 on 2019-07-09 11:04

from django.db import migrations, models
import django.db.models.deletion
import fingerprintData.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('customer_code', models.CharField(max_length=16, primary_key=True, serialize=False)),
                ('customer_name', models.CharField(max_length=50)),
                ('customer_surname', models.CharField(max_length=50)),
                ('customer_register_date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Fingerprint',
            fields=[
                ('fingerprint_code', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('fingerprint_data', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('product_code', models.AutoField(primary_key=True, serialize=False)),
                ('product_name', models.CharField(max_length=50)),
                ('product_price', models.PositiveIntegerField(default=0)),
                ('product_origin', models.CharField(choices=[('NA', 'North America'), ('SA', 'South America'), ('AS', 'Asia'), ('UE', 'Europe'), ('AU', 'Australia'), ('AF', 'Africa')], max_length=2)),
            ],
        ),
        migrations.CreateModel(
            name='Purchase',
            fields=[
                ('purchase_code', models.BigAutoField(primary_key=True, serialize=False)),
                ('purchase_date', models.DateField()),
                ('purchase_customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fingerprintData.Customer')),
            ],
        ),
        migrations.CreateModel(
            name='Type',
            fields=[
                ('type_id', models.AutoField(primary_key=True, serialize=False)),
                ('type_description', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='PurchaseList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('purchaseList_qty', models.PositiveIntegerField(default=0, validators=[fingerprintData.models.validate_nonzero])),
                ('purchaseList_code', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fingerprintData.Purchase')),
                ('purchaseList_product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fingerprintData.Product')),
            ],
        ),
        migrations.AddField(
            model_name='product',
            name='product_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fingerprintData.Type'),
        ),
        migrations.AddField(
            model_name='customer',
            name='customer_fingerprint',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='fingerprintData.Fingerprint'),
        ),
    ]
