from rest_framework import serializers
from api.models import Note

class NoteSerializer(serializers.HyperlinkedModelSerializer):
    """Note Serializer

    Author: Hayley Landsberg
    
    This serializer represents JSON for the Note resource.
    """
    class Meta: 
        model = Note
        fields = '__all__'