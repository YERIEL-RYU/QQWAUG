from django.urls import path
from . import views


urlpatterns = [
    path('', views.OilAdminList.as_view()),
    path('<str:userid>/', views.OilList.as_view()),
    path('<str:userid>/<int:oilid>/', views.OilDetail.as_view()),

]
