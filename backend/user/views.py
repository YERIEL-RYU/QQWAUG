import json
from django.http import Http404
from django.contrib.auth import get_user_model
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from .serializers import UserLoginSerializer, UserCreateSerializer, UserSerializer, ProfileSerializer
from .permissions import IsUserOrReadOnly
from .models import User, Profiles


class DuplicateUserid(APIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def get(self, request, userid):
        print(userid)
        queryset = User.objects.filter(userid=userid)
        serializer = UserSerializer(queryset, many=True)
        if not serializer.data:
            print('empty')
            return Response({"message": "You can make userid"}, status=status.HTTP_200_OK)
        return Response({"message": "duplicate userid"}, status=status.HTTP_409_CONFLICT)


class Profile(APIView):
    permission_classes = (AllowAny,)
    serializer_class = ProfileSerializer
    parser_classes = (JSONParser, MultiPartParser)

    def get_object(self, userid):
        try:
            return Profiles.objects.get(userid=userid)
        except:
            raise Http404

    def post(self, request):
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, userid):
        queryset = self.get_object(userid=userid)
        serializer = ProfileSerializer(queryset)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


User = get_user_model()


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    if request.method == 'POST':
        serializer = UserLoginSerializer(data=request.data)

        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Request Body Error."}, status=status.HTTP_409_CONFLICT)
        if serializer.validated_data['userid'] == "None":
            return Response({'message': 'fail'}, status=status.HTTP_200_OK)

        response = {
            'success': 'True',
            'token': serializer.data['token'],
            'userid': serializer.data['userid'],
        }
        return Response(response, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def createUser(request):
    if request.method == 'POST':
        serializer = UserCreateSerializer(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Request Body Error."}, status=status.HTTP_409_CONFLICT)

        if User.objects.filter(userid=serializer.validated_data['userid']).first() is None:
            serializer.save()
            return Response({"message": "ok"}, status=status.HTTP_201_CREATED)
        return Response({"message": "duplicate userid"}, status=status.HTTP_409_CONFLICT)
