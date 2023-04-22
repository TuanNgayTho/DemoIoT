import requests
from celery import shared_task
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import paho.mqtt.client as mqtt
import time

channel_layer = get_channel_layer()
mqttBroker = '103.184.113.154'
client =  mqtt.Client("led")
client.connect(mqttBroker)
client.subscribe('abc')



@shared_task
def get_joke():
    url = 'https://api.chucknorris.io/jokes/random'
    responce = requests.get(url).json()
    joke = responce["value"]
    async_to_sync(channel_layer.group_send)('Led', {'type': 'send_jokes','text': joke} )

@shared_task
def mpqtt_message():
    def on_message(client, user, message):
        mqtt_message = str(message.payload.decode("utf-8"))
        print('Received message:', mqtt_message)
        async_to_sync(channel_layer.group_send)('Mqtt', {'type': 'send_mqtt', 'text': mqtt_message})

    mqttBroker = '103.184.113.154'
    client = mqtt.Client("led")
    client.connect(mqttBroker)
    client.subscribe('Test')

    client.loop_start()
    client.on_message = on_message
    time.sleep(30)
    client.loop_stop()