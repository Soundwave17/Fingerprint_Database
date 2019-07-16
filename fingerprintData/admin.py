from django.contrib import admin

from .models import Product, Customer, Purchase, PurchaseList, Type, Fingerprint


class CustomerAdmin(admin.ModelAdmin):
    list_display = ('customer_email','customer_name', 'customer_surname', 'customer_register_date')
    list_filter = ('customer_register_date', 'customer_name', 'customer_surname', 'customer_email')
    search_fields = ('customer_email', 'customer_name', 'customer_surname','customer_register_date')

class ProductAdmin(admin.ModelAdmin):
    list_display = ('product_code', 'product_name', 'product_price', 'product_type', 'product_origin')
    list_filter = ('product_name', 'product_price', 'product_type', 'product_origin')
    search_fields = ('product_name', 'product_price', 'product_type', 'product_origin')

class PurchaseAdmin(admin.ModelAdmin):
    list_display = ('purchase_code', 'purchase_customer', 'purchase_date')
    list_filter = ('purchase_customer', 'purchase_date')
    search_fields = ('purchase_customer', 'purchase_date')

class PurchaseListAdmin(admin.ModelAdmin):
    list_display = ('purchaseList_code', 'purchaseList_product', 'purchaseList_qty')
    list_filter = ('purchaseList_product', 'purchaseList_qty')
    search_fields = ('purchaseList_product', 'purchaseList_qty')

class TypeAdmin(admin.ModelAdmin):
    list_display = ('type_id', 'type_description')
    search_fields = ('type_description')


class FingerprintAdmin(admin.ModelAdmin):
    list_display = ('fingerprint_code', 'fingerprint_data')
    search_fields = ('fingerprint_data')


admin.site.register(Product, ProductAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Purchase, PurchaseAdmin)
admin.site.register(PurchaseList,PurchaseListAdmin)
admin.site.register(Type, TypeAdmin)
admin.site.register(Fingerprint, FingerprintAdmin)


