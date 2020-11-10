from django.urls import path
from . import views

urlpatterns = [
    path('<str:userid>/', views.MycarList.as_view())
]
