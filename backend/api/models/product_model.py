from django.db import models
from django.contrib.auth.models import User
from .producttype_model import ProductType

class Product(models.Model):
  seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products', default="")
  product_type = models.ForeignKey('ProductType', on_delete=models.CASCADE, related_name='products')
  title = models.CharField(max_length=25)
  description = models.CharField(max_length=255)
  price = models.DecimalField(decimal_places=2, max_digits=12)
  quantity = models.IntegerField()

  def __str__(self):
    return self.title
