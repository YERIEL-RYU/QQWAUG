from django.urls import path
from . import views

urlpatterns = [
    path('', views.enginoilList.as_view()),
    path('<str:userid>/', views.enginoilDetail.as_view())
]
