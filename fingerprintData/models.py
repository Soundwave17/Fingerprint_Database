import datetime
from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.core.validators import  MinValueValidator
from decimal import Decimal


# throws exception in case of 0 passed as a paramater for the field.
def validate_nonzero(value):
    if value == 0:
        raise ValidationError(
            ('Quantity %(value)s is not allowed'),
            params={'value': value},
        )

class Customer(models.Model):
    customer_email = models.EmailField(primary_key=True)
    customer_password = models.CharField(max_length=16)
    customer_name = models.CharField(max_length=50)
    customer_surname = models.CharField(max_length=50)
    customer_fingerprint= models.ForeignKey('Fingerprint', on_delete=models.PROTECT)
    customer_register_date = models.DateField(default=timezone.now)
    customer_admin = models.BooleanField(default=False)

    def __str__(self):
        return "%s %s %s" % (self.customer_name, self.customer_surname, self.customer_register_date)


class Product(models.Model):
    NORTH_AMERICA = 'NA'
    SOUTH_AMERICA = 'SA'
    ASIA = 'AS'
    EUROPE = 'UE'
    AUSTRALIA = 'AU'
    AFRICA = 'AF'

    choices_list = [
        (NORTH_AMERICA, 'North America'),
        (SOUTH_AMERICA, 'South America'),
        (ASIA, 'Asia'),
        (EUROPE, 'Europe'),
        (AUSTRALIA, 'Australia'),
        (AFRICA, 'Africa'),
    ]

    #TODO add TextField for description
    product_code = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=50, blank=False, unique=True)
    product_price = models.DecimalField(decimal_places=2, max_digits=8, validators=[MinValueValidator(Decimal('0.01'))] )
    product_type = models.ForeignKey('Type', on_delete=models.CASCADE)
    product_origin = models.CharField(max_length=2, choices=choices_list, blank=False)
    product_description= models.TextField(max_length=50, default="A new product.")
    product_image = models.ImageField(upload_to = 'gallery', default = 'gallery/no-img.jpg')

    def __str__(self):
        return "%s %s %s %s" % (self.product_name, self.product_price, self.product_type, self.product_origin)


class Fingerprint(models.Model):

    fingerprint_id = models.PositiveIntegerField(primary_key= True, blank=False, validators=[validate_nonzero])

    def __str__(self):
        return "%s" % (self.fingerprint_id)


class Purchase(models.Model):
    purchase_code = models.BigAutoField(primary_key=True)
    purchase_customer = models.ForeignKey('Customer', on_delete=models.CASCADE)
    purchase_date = models.DateField(default=timezone.now)

    def was_made_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.purchase_date <= now

    def __str__(self):
        return "%s %s" % (self.purchase_customer, self.purchase_date)

class Type(models.Model):
    type_id = models.AutoField(primary_key=True)
    type_description = models.CharField(max_length=200, blank=False, unique=True)

    def __str__(self):
        return self.type_description


class PurchaseList(models.Model):
    purchaseList_code = models.ForeignKey('Purchase', on_delete=models.CASCADE)
    purchaseList_product = models.ForeignKey('Product', on_delete=models.CASCADE)
    purchaseList_qty = models.PositiveIntegerField(
        default=0,
        validators=[validate_nonzero]
    )

    def __str__(self):
        return "%s %s" % (self.purchaseList_product, self.purchaseList_qty)
