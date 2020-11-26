from django.shortcuts import render
from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .models import EnginOil
from .serializers import EnginOilSerializer


class enginoilList(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = EnginOilSerializer
    authentication_classes = (JSONWebTokenAuthentication,)
    parser_classes = (JSONParser, MultiPartParser)

    def get(self, request, format=None):
        queryset = EnginOil.objects.all()
        serializer = EnginOilSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        print(request.data)
        serializer = EnginOilSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class enginoilDetail(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = EnginOilSerializer
    authentication_classes = (JSONWebTokenAuthentication,)

    def get_object(self, userid):
        try:
            enginoil = EnginOil.objects.filter(userid=userid)
            return enginoil
        except:
            raise Http404

    def get(self, request, userid):
        queryset = self.get_object(userid)
        serializer = EnginOilSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, userid):
        enginoil = EnginOil.objects.get(pk=userid)
        serializer = EnginOilSerializer(enginoil, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, userid):
        enginoil_id = request.data['enginoil_id']
        enginoil = EnginOil.objects.get(pk=enginoil_id)
        enginoil.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
