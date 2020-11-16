from django.urls import path
from . import views

urlpatterns = [
    path('', views.MycarList.as_view()),
    path('<str:userid>/', views.MycarList.as_view())
]
