from django.db import models

# Create your models here.
class data(models.Model):
    title = models.CharField(max_length=255)
    price = models.IntegerField(default=0)
    content= models.CharField(max_length=255)
    joindate = models.DateField()
    created_at = models.DateTimeField()