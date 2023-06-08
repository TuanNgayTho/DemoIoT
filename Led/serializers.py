from rest_framework import serializers
from .models import data
class getAllData(serializers.ModelSerializer):
    class Meta:
        model = data
        fields = ('id', 'joindate', 'price')