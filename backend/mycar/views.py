from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .models import Mycar
from .serializers import MycarSerializer


class MycarList(APIView):
    # 조회
    @api_view(['GET'])
    @permission_classes((IsAuthenticated,))
    @authentication_classes((JSONWebTokenAuthentication,))
    def get(self, requset, format=None):
        queryset = Mycar.objects.all()
        serializer = MycarSerializer(queryset)
        return Response(serializer)
