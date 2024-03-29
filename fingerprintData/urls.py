from django.urls import path
from . import views

app_name= 'fingerprintData'
urlpatterns = [
    path('', views.access.as_view(), name='access'),
    path('customer_login/', views.customer_login, name='customer_login'),
    path('<str:customer_email>/fingerprint_access/customer_exists/', views.customer_exists, name='customer_exists'),
    path('<str:customer_email>/fingerprint_access/',views.fingerprint_access.as_view() , name='fingerprint_access'),
    path('<str:customer_email>/fingerprint_access/get_customer_id/',views.get_customer_id , name='get_customer_id'),
    path('<str:customer_email>/fingerprint_access/overview/',views.overview.as_view() , name='overview'),
    path('<str:customer_email>/fingerprint_access/overview/get_product_by_type/', views.get_product_by_type, name="get_product_by_type"),
    path('<str:customer_email>/fingerprint_access/overview/delete_customer/',views.delete_customer , name='delete_customer'),
    path('<str:customer_email>/fingerprint_access/overview/get_product_by_type/', views.get_product_by_type, name="get_product_by_type"),
    path('<str:customer_email>/fingerprint_access/overview/get_revenue_by_year/', views.get_revenue_by_year, name='revenue'),
    path('<str:customer_email>/fingerprint_access/overview/get_revenue_by_type/', views.get_revenue_by_type, name='revenue_type'),
    path('<str:customer_email>/fingerprint_access/overview/get_customer_id/', views.get_customer_id, name='get_customer_id'),
    path('<str:customer_email>/fingerprint_access/purchase/', views.purchase.as_view(), name='purchase'),
    path('<str:customer_email>/fingerprint_access/purchase/purchase_success/', views.purchase_success.as_view(), name='purchase_success'),
    path('<str:customer_email>/fingerprint_access/purchase/checkout/', views.checkout, name='checkout'),
    path('<str:customer_email>/fingerprint_access/purchase/get_customer_id/', views.get_customer_id, name='get_customer_id'),
    path('register/create_customer/', views.create_customer, name='create_customer'),
    path('register/get_free_id/', views.get_free_id, name='get_free_id'),
    path('register/register_success/', views.register_success.as_view(), name='register_success'),
    path('register/', views.register.as_view(), name='register'),
]