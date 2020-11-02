from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import generics
from .serializers import *
from .models import posts


class postsMain(viewsets.ModelViewSet):
    queryset = posts.objects.all()
    serializer_class = postsSerializer


# post list
class postsList(generics.ListAPIView):
    queryset = posts.objects.all()
    serializer_class = postsListSerializer


# post detail
class postsDetail(generics.RetrieveAPIView):
    lookup_field = 'id'
    queryset = posts.objects.all()
    serializer_class = postsListSerializer


# post create
class postsCreate(generics.CreateAPIView):
    queryset = posts.objects.all()
    serializer_class = postsSerializer


# post update
class postsUpdate(generics.UpdateAPIView):
    lookup_field = 'id'
    queryset = posts.objects.all()
    serializer_class = postsListSerializer


# post delete
class postsDelete(generics.DestroyAPIView):
    lookup_field = 'id'
    queryset = posts.objects.all()
    serializer_class = postsListSerializer
