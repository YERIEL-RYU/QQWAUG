from rest_framework import viewsets, status
from django.contrib.auth.models import User
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from .serializers import UserLoginSerializer, UserCreateSerializer
from .permissions import IsUserOrReadOnly
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model

User = get_user_model()


# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = (IsUserOrReadOnly)


# class SignInView(CreateAPIView):
#     serializer_class = SignupSerializer
#     permission_classes = (AllowAny)

#     def post(self, request, *args, **kwargs):
#         serializer_user = SignupSerializer(data=request.data)
#         if serializer_user.is_valid():
#             User.objects.create_user(
#                 userid=serializer_user.initial_data['userid'],
#                 username=serializer_user.initial_data['username'],
#                 useremail=serializer_user.initial_data['useremail'],
#                 password=serializer_user.initial_data['password'],
#             )

#             tokens = JSONWebTokenSerializer(
#                 request.data).validate(request.data)

#             return Response(tokens, status=status.HTTP_201_CREATED)

#         else:
#             return Response(serializer_user._errors, status=status.HTTP_400_BAD_REQUEST)


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
