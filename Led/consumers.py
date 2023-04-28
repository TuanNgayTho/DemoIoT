from channels.generic.websocket import AsyncWebsocketConsumer
import json

class JokesConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add('Led', self.channel_name,)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard('Led', self.channel_name,)

    async def send_jokes(self,event):
        text_message = event['text']
        await self.send(text_message)



class MqttConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add('Mqtt', self.channel_name,)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard('Mqtt', self.channel_name,)

    async def send_mqtt(self,event):
        text_message = event['text']
        await self.send(json.dumps(text_message))