from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .models import Mycar
from .serializers import MycarSerializer
from user.models import User


class MycarList(APIView):
    # 조회
    @permission_classes((IsAuthenticated,))
    @authentication_classes((JSONWebTokenAuthentication))
    def get(self, requset, userid):
        getuserid = User.objects.get(userid=userid)
        queryset = Mycar.objects.get(author=getuserid)
        serializer = MycarSerializer(queryset)
        return Response(serializer.data)
