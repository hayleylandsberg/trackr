from rest_framework import serializers
from api.models import Job

class JobSerializer(serializers.HyperlinkedModelSerializer):
    """Jobs Serializer

    Author: Hayley Landsberg
    
    This serializer represents JSON for the Job resource.
    """
    class Meta: 
        model = Job
        fields = '__all__'