from rest_framework import viewsets, status, mixins
from rest_framework.response import Response
from django.http import Http404
from api.models import Task
from api.serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer

    def get_queryset(self):
        # user = self.request.user
        # job = Job.objects.filter(user=user)
        queryset = Task.objects.all()
        return queryset

    # http_method_names = ['get', 'put', 'post', 'head']
