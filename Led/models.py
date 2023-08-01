from django.db import models
from django.utils import timezone

# Create your models here.
class data(models.Model):
    # title = models.CharField(max_length=255)
    price = models.IntegerField(default=0)
    # content= models.CharField(max_length=255)
    joindate = models.DateField()
    # created_at = models.DateTimeField()
class Sensor(models.Model):
    temperature = models.FloatField(default=0)
    humidity = models.FloatField(default=0)
    timestamp = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return "Nhiệt độ: " f"{self.temperature}" + " Độ ẩm: " f"{self.humidity}" + " Thời gian: " f"{self.timestamp}"