from django.contrib.auth.models import User
from rest_framework import viewsets
from django.core import serializers

from api.models import *
from api.serializers import *

class CustomerViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows Customers to be viewed or edited
  """
  queryset = Customer.objects.all()
  serializer_class = CustomerSerializer

class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer
