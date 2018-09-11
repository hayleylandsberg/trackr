from rest_framework import viewsets, status, mixins
from rest_framework.response import Response
from django.http import Http404
from api.models import Job
from api.serializers import JobSerializer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    http_method_names = ['get', 'put', 'post', 'head']