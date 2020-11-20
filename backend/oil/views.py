from django.shortcuts import render
from django.http import Http404
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .models import Oil
from .serializers import OilSerializer


class OilAdminList(APIView):
    permission_classes = (AllowAny,)
    serializer_class = OilSerializer
    authentication_classes = (JSONWebTokenAuthentication,)
    parser_classes = (JSONParser, MultiPartParser)

    def get(self, request, format=None):
        queryset = Oil.objects.all()
        serializer = OilSerializer(queryset, many=True)
        return Response(serializer.data)


class OilList(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = OilSerializer
    authentication_classes = (JSONWebTokenAuthentication,)

    def get_object(self, userid):
        try:
            return Oil.objects.get(userid=userid)
        except:
            raise Http404

    def get(self, request, userid):
        queryset = Oil.objects.filter(userid=userid)
        serializer = OilSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        print(request.data)
        serializer = OilSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OilDetail(APIView):
    def get_object(self, pk):
        try:
            return Oil.objects.get(pk=pk)
        except:
            raise Http404

    def put(self, request, userid):
        Oil = self.get_object(userid=userid)
        serializer = OilSerializer(Oil, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, userid, oilid):
        Oil = self.get_object(pk=oilid)
        Oil.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
