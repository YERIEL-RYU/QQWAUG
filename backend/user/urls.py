from django.urls import path
from . import views


urlpatterns = [
    path('login/', views.login),
    path('create/', views.createUser),
    path('duplicate/<str:userid>', views.DuplicateUserid.as_view()),
    path('profile/', views.Profile.as_view()),
    path('profile/<str:userid>/', views.Profile.as_view())
]
