from rest_framework import serializers
from api.models import Task

class TaskSerializer(serializers.HyperlinkedModelSerializer):
    # user = serializers.ReadOnlyField(source='user.url')

    class Meta: 
        model = Task
        fields = ('job', 'task')