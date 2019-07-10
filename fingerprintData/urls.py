from django.urls import path
from . import views

urlpatterns = [
    path('', views.access, name='access'),
    path('access/', views.overview, name='overview'),
    path('access/', views.purchase, name='purchase'),
    path('access/purchase/', views.checkout, name='checkout')
]