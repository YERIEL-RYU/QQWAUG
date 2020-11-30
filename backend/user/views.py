from django.http import Http404
from django.contrib.auth import get_user_model
from rest_framework import  status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from .serializers import UserLoginSerializer, UserCreateSerializer, UserSerializer, ProfileSerializer
from .models import User, Profiles

import json



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

    def post(self, request):
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileDetail(APIView):
    permission_classes = (AllowAny,)
    serializer_class = ProfileSerializer, UserSerializer
    parser_classes = (JSONParser, MultiPartParser)

    def get_object(self, userid):
        try:
            return Profiles.objects.get(userid=userid)
        except:
            raise Http404

    def get(self, request, userid):
        queryset = self.get_object(userid=userid)
        userqueryset = User.objects.get(userid=userid)
        user = UserSerializer(userqueryset)
        serializer = ProfileSerializer(queryset)
        newData = dict(user.data, **serializer.data)
        print(newData)
        return Response(data=newData, status=status.HTTP_200_OK)

    def patch(self, request, userid):
        print(request.data)
        profile = self.get_object(userid=userid)
        serializer = ProfileSerializer(profile, data=request.data)
        print(serializer.is_valid())
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


User = get_user_model()


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    if request.method == 'POST':
        serializer = UserLoginSerializer(data=request.data)

        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "Request Body Error."}, status=status.HTTP_401_UNAUTHORIZED)
        if serializer.validated_data['userid'] == "None":
            return Response({'message': 'fail'}, status=status.HTTP_409_CONFLICT)

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


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def modifyUser(request, userid):
    if request.method == 'PATCH':
        print(request.data)
        try :
            queryset = User.objects.get(userid=userid)
        except :
            raise Http404
        if not (request.data['password'] == ''):
            queryset.set_password(request.data['password'])
            queryset.save()
            return Response({"success"}, status=status.HTTP_201_CREATED)
        elif (request.data['useremail']==''):
            queryset.useremail = request.data['useremail']
            queryset.save()
            return Response({"success"}, status=status.HTTP_201_CREATED)
    return Response({"message": "400 Bad request"}, status=status.HTTP_400_BAD_REQUEST)
    