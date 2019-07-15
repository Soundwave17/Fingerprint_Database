from django.urls import path
from . import views

urlpatterns = [
    path('', views.access.as_view(), name='access'),
    path('customer_login/', views.customer_login, name='customer_login'),
    path('customer_exists/', views.customer_exists, name='customer_exists'),
    path('create_customer/', views.create_customer, name='create_customer'),
    path('access/',views.overview.as_view() , name='overview'),
    path('access/', views.purchase.as_view(), name='purchase'),
    path('access/purchase/', views.checkout.as_view(), name='checkout'),
]