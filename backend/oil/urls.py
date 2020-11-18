from django.urls import path
from . import views


urlpatterns = [
    path('', views.OilList.as_view()),
    path('<str:userid>/', views.OilDetail.as_view())
]
