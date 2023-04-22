from django.urls import path
from .consumers import JokesConsumer, MqttConsumer

websocket_urlpatterns = [
    path("ws/Led/", JokesConsumer.as_asgi()),
    path("ws/Mqtt/", MqttConsumer.as_asgi()),
]