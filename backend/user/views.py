from rest_framework import viewsets, status
from django.contrib.auth.models import User
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from .serializers import UserSerializer, SignupSerializer
from .permissions import IsUserOrReadOnly


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsUserOrReadOnly)


class SignInView(CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = (AllowAny)

    def post(self, request, *args, **kwargs):
        serializer_user = SignupSerializer(data=request.data)
        if serializer_user.is_valid():
            User.objects.create_user(
                userid=serializer_user.initial_data['userid'],
                username=serializer_user.initial_data['username'],
                useremail=serializer_user.initial_data['useremail'],
                password=serializer_user.initial_data['password'],
            )

            tokens = JSONWebTokenSerializer(
                request.data).validate(request.data)

            return Response(tokens, status=status.HTTP_201_CREATED)

        else:
            return Response(serializer_user._errors, status=status.HTTP_400_BAD_REQUEST)
