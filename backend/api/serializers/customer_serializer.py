from django.contrib.auth.models import User
from api.models import *
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'url', 'username', 'email')

class CustomerSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Customer
    fields = '__all__'
