from django.db import models
from django.contrib.auth.models import User
from .jobs_model import Job

class Task(models.Model):
    task = models.CharField(max_length=250)
    job = models.ForeignKey('Job', on_delete=models.CASCADE)

    def __str__(self):
        return self.task