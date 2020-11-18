import debug_toolbar
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('auth/token/', obtain_jwt_token),  # 토큰 발급
    path('auth/token/verify/', verify_jwt_token),  # 토큰 확인
    path('auth/token/refresh/', refresh_jwt_token),  # 토큰 재발급
    path('mycar/', include('mycar.urls')),
    path('users/', include('user.urls')),
    path('enginoil/', include('enginoil.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
