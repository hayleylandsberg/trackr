from rest_framework import serializers
from api.models import Job

class JobSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.ReadOnlyField(source='user.url')

    class Meta: 
        model = Job
        fields = ("url", "pk", "user", "company", "title", "location", "image", "salary", "link", "description", "deadline_date", "applied_date", "interview_date1", "interview_date2", "offer_date", "card_color", "category")