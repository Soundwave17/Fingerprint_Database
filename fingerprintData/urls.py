from django.urls import path
from . import views

app_name= 'fingerprintData'
urlpatterns = [
    path('', views.access.as_view(), name='access'),
    path('customer_login/', views.customer_login, name='customer_login'),
    path('customer_exists/', views.customer_exists, name='customer_exists'),
    path('<str:customer_email>/overview/',views.overview.as_view() , name='overview'),
    path('<str:customer_email>/purchase/', views.purchase.as_view(), name='purchase'),
    path('<str:customer_email>/purchase/checkout', views.checkout.as_view(), name='checkout'),
    path('register/create_customer/', views.create_customer, name='create_customer'),
    path('access/purchase/', views.checkout.as_view(), name='checkout'),
    path('register/', views.register.as_view(), name='register'),
]