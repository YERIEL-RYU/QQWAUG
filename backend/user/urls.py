from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from . import views


urlpatterns = [
    path('login/', views.login),
    path('create/', views.createUser),
    path('duplicate/<str:userid>', views.DuplicateUserid.as_view()),
    path('profile/', views.Profile.as_view())
]
