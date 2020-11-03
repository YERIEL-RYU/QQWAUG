from django.urls import path
from . import views

urlpatterns = [
    path('', views.MycarList.as_view())
]
