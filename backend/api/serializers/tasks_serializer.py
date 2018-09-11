from rest_framework import serializers
from api.models import Task

class TaskSerializer(serializers.HyperlinkedModelSerializer):
    """Task Serializer

    Author: Hayley Landsberg
    
    This serializer represents JSON for the Task resource.
    """
    class Meta: 
        model = Task
        fields = '__all__'