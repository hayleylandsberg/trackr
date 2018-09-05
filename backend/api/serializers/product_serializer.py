from rest_framework import serializers
from api.models import *
from .customer_serializer import CustomerSerializer

class ProductTypeSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = ProductType
    fields = '__all__'


class ProductSerializer(serializers.HyperlinkedModelSerializer):
  # When we pass in the url as the source, Django extracts the ID from the url and saves it as the foreign key
  seller = serializers.ReadOnlyField(source='seller.url')

  class Meta:
    model = Product
    fields = (
        'id',
        'url',
        'seller',
        'product_type',
        'title',
        'description',
        'price',
        'quantity',
    )
