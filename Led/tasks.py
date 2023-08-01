import requests
from celery import shared_task
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import paho.mqtt.client as mqtt
from ClassMqtt import ClassMqtt
import threading
import json
from MQTT_subscribe import MyMQTTClass
import time
from SQL_insert import insertSQL
import multiprocessing as mp


channel_layer = get_channel_layer()
status = 0
data = {}

@shared_task
def get_joke():
    # url = 'https://api.chucknorris.io/jokes/random'
    # responce = requests.get(url).json()
    # joke = responce["value"]
    response = MyMQTTClass()
    model = response.run()
    if model != '':
        print(model['d'])
    else:
        model = {
                "d":{
                "model":"Disconnect"
                },"ts":""
                }
    async_to_sync(channel_layer.group_send)('Led', {'type': 'send_jokes','text': model['d']} )
    # async_to_sync(channel_layer.group_send)('Mqtt', {'type': 'send_mqtt', 'text': mqtt_message})
@shared_task
def mpqtt_message():
    global status
    class MyMQTTClass(mqtt.Client):
        def on_connect(self, mqttc, obj, flags, rc):
            print("rc: " + str(rc))
            global status
            status = 1

        def on_connect_fail(self, mqttc, obj):
            print("Connect failed")
            global status
            status = 0

        # def on_log(self, mqttc, obj, level, string):
        #     print(string)

        def on_message(self, mqttc, obj, msg):
            global data
            # print(msg.topic + " " + str(msg.qos) + " " + str(json.loads(msg.payload)))
            # mqtt_message = json.loads(msg.payload)
            if msg.topic == 'Test2' or msg.topic == 'Test1':
                text = json.loads(msg.payload)
                text["type"] = "boolean"
                text["topic"] = msg.topic
                async_to_sync(channel_layer.group_send)('Mqtt', {'type': 'send_mqtt', 'text': text})
            if msg.topic == 'Test3':
                text = json.loads(msg.payload)
                text["type"] = "value"
                text["topic"] = msg.topic
                async_to_sync(channel_layer.group_send)('Mqtt', {'type': 'send_mqtt', 'text': text})
            if msg.topic == 'Test':
                text = json.loads(msg.payload)
                text["type"] = "value"
                text["topic"] = msg.topic
                data =text
                async_to_sync(channel_layer.group_send)('Mqtt', {'type': 'send_mqtt', 'text': text})

        def run(self):
            global status
            Toppic = [("Test", 0),("Test1", 0),("Test2", 0),("Test3", 0)]
            self.connect("103.184.113.154", 1883, 60)
            self.subscribe(Toppic)

            # rc = 0
            # while rc == 0:
            #     rc = self.loop()
            # status = 0
            # return rc

            while True:
                rc = self.loop()
                if rc != mqtt.MQTT_ERR_SUCCESS:
                    try:
                        # todo, don't block. Calculate time for reconnect.
                        time.sleep(1.0)
                        # todo, don't try to reconnect every failed loop iteration
                        self.reconnect()
                    except ():
                        pass

    mqttc = MyMQTTClass("hihi")
    p1 = threading.Thread(target=mqttc.run, daemon= True, args=(), name="mqtt")
    if status == 0:
        p1.start()

@shared_task
def insertData():
    global data
    try:
        if data != {}:
            value= data['d']
            dataSQL = (value['ItemValue3'], value['ItemValue2'], data["ts"])
            try:
                insertSQL(dataSQL)
            except:
                pass
    except:
        pass