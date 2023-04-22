from django.urls import path
from .consumers import JokesConsumer

websocket_urlpatterns = [
    path("ws/jokes/", JokesConsumer.as_asgi()),
]