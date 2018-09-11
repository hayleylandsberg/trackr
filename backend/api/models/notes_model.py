from django.db import models
from django.contrib.auth.models import User
from .jobs_model import Job

class Note(models.Model):
    note = models.TextField(max_length=4000)
    job = models.ForeignKey('Job', on_delete=models.CASCADE)

    def __str__(self):
        return self.note