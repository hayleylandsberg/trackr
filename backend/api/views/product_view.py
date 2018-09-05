from rest_framework import viewsets
from api.serializers import *
from api.models import *

class ProductTypeViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows ProductTypes to be viewed or edited
  """
  queryset = ProductType.objects.all().order_by("title")
  serializer_class = ProductTypeSerializer


class ProductViewSet(viewsets.ModelViewSet):
  """
  API endpoint that allows Products to be viewed or edited
  """
  queryset = Product.objects.all().order_by("title")
  serializer_class = ProductSerializer

  def perform_create(self, serializer):
    # Since we don't pass the user info in the POST body from the client app, we add that info here as the argument to our overridden version of the save() method
    serializer.save(seller=self.request.user)
