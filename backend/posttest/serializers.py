from rest_framework import serializers
from .models import posts


class postsSerializer(serializers.ModelSerializer):
    class Meta:
        model = posts  # 모델 설정
        fields = ('title', 'content', 'writer')  # 필드 설정


# post list
class postsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = posts  # 모델 설정
        fields = ('id', 'title', 'content', 'writer')  # 필드 설정
