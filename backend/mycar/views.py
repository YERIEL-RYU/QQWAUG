from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .models import Mycar
from .serializers import MycarSerializer


class MycarList(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = MycarSerializer
    authentication_classes = (JSONWebTokenAuthentication,)

    def get_object(self, userid):
        try:
            return Mycar.objects.filter(userid=userid).first()
        except:
            raise Http404

    # 조회

    def get(self, requset, userid, format=None):
        queryset = self.get_object(userid)
        serializer = MycarSerializer(queryset)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 등록

    def post(self, request):
        serializer = MycarSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
