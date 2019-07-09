from django.contrib import admin

from .models import Product, Customer, Purchase, PurchaseList, Type, Fingerprint

admin.site.register(Product)
admin.site.register(Customer)
admin.site.register(Purchase)
admin.site.register(PurchaseList)
admin.site.register(Type)
admin.site.register(Fingerprint)
