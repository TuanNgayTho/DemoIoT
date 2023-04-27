import requests
from celery import shared_task
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import paho.mqtt.client as mqtt
from ClassMqtt import ClassMqtt
import threading

channel_layer = get_channel_layer()

@shared_task
def get_joke():
    url = 'https://api.chucknorris.io/jokes/random'
    responce = requests.get(url).json()
    joke = responce["value"]
    async_to_sync(channel_layer.group_send)('Led', {'type': 'send_jokes','text': joke} )
    # async_to_sync(channel_layer.group_send)('Mqtt', {'type': 'send_mqtt', 'text': mqtt_message})
@shared_task
def mpqtt_message():
    class MyMQTTClass(mqtt.Client):

        def on_connect(self, mqttc, obj, flags, rc):
            print("rc: " + str(rc))

        def on_connect_fail(self, mqttc, obj):
            print("Connect failed")

        def on_message(self, mqttc, obj, msg):
            print(msg.topic + " " + str(msg.qos) + " " + str(msg.payload))
            mqtt_message = str(msg.payload)
            async_to_sync(channel_layer.group_send)('Mqtt', {'type': 'send_mqtt', 'text': mqtt_message})

        def run(self):
            self.connect("103.184.113.154", 1883, 60)
            self.subscribe("Test", 0)

            rc = 0
            while rc == 0:
                rc = self.loop()
            return rc

    mqttc = MyMQTTClass()
    p1 = threading.Thread(target=mqttc.run, daemon= True, args=())
    p1.start()