"""trackr_API URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from api.views import register_view, jobs_view, create_job_view#, notes_view, tasks_view

router = routers.DefaultRouter()
# router.register(r'users', register_view.UserViewSet)
router.register(r'jobs', jobs_view.JobViewSet)
# router.register(r'create_jobs', create_job_view.CreateJobViewSet, base_name='create_jobs')
# router.register(r'notes', notes_view.NoteViewSet, base_name='notes')
# router.register(r'tasks', tasks_view.TaskViewSet, base_name='tasks')
# router.register(r'products', product_view.ProductViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^', include(router.urls)),
    url(r'^register/', register_view.register_user),
    url(r'^api-token-auth/', obtain_auth_token),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
