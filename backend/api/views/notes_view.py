from rest_framework import viewsets, status, mixins
from rest_framework.response import Response
from django.http import Http404
from api.models import Note
from api.serializers import NoteSerializer

class NoteViewSet(viewsets.ModelViewSet):
    # queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def get_queryset(self):
        # user = self.request.user
        queryset = Note.objects.all()
        return queryset

    # http_method_names = ['get', 'put', 'post', 'head']
