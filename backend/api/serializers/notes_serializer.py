from rest_framework import serializers
from api.models import Note

class NoteSerializer(serializers.HyperlinkedModelSerializer):
    # user = serializers.ReadOnlyField(source='user.url')

    class Meta: 
        model = Note
        fields = ('job', 'note', 'url')