from django.conf.urls import url, include
from posttest.views import postsMain
from . import views

urlpatterns = [
    url('list/$', views.postsList.as_view(), name='postsList'),  # list url
    url('list/(?P<id>\d+)/$', views.postsDetail.as_view(), name='postsDetail'),
    url('list/create/$', views.postsCreate.as_view(), name='postsCreate'),
    url('list/(?P<id>\d+)/update$', views.postsUpdate.as_view(), name='postsUpdate'),
    url('list/(?P<id>\d+)/delete$', views.postsDelete.as_view(), name='postsDelete'),
]
