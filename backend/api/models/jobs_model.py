from django.db import models
from django.contrib.auth.models import User

class Job(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  company = models.CharField(max_length=100)
  title = models.CharField(max_length=100)
  location = models.CharField(max_length=100)
  image = models.ImageField(upload_to=None, height_field=None, width_field=None, max_length=100, null=True)
  salary = models.IntegerField()
  url = models.URLField(max_length=250)
  description = models.TextField(max_length=2000)
  deadline_date = models.DateField(null=True)
  applied_date = models.DateField(null=True)
  interview_date1 = models.DateField(null=True)
  interview_date2 = models.DateField(null=True)
  offer_date = models.DateField(null=True)
  card_color = models.CharField(max_length=7, default="#FFFFFF", editable=True)
  category = models.CharField(max_length=25, default="wishlist", editable=True)

  def __str__(self):
    return self.company