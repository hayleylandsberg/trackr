from rest_framework import viewsets, status, mixins
from rest_framework.response import Response
from django.http import Http404
from api.models import Job
from api.serializers import JobSerializer

class JobViewSet(viewsets.ModelViewSet):
    serializer_class = JobSerializer
    
#for GET ONLY
    def get_queryset(self):
        user = self.request.user
        queryset = Job.objects.filter(user=user)
        return queryset

    # http_method_names = ['get', 'put', 'post', 'head']
    