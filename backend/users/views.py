import json

from django.views import View
from django.shortcuts import render
from django.http import JsonResponse

from .models import User


class CreateView(View):
    def post(self, request):
        data = json.loads(request.body)
        User(
            user_id=data[user_id],
            password=data[password],
            user_name=data[user_name]
        )
