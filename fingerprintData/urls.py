from django.urls import path
from . import views

urlpatterns = [
    path('', views.prova, name='prova'),
    path('access/', views.overview, name='overview'),
    path('access/', views.purchase, name='purchase'),
    path('access/purchase/', views.checkout, name='checkout'),
]