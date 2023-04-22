import paho.mqtt.client as mqtt

def on_message(client, user, message):
    mqtt_message = str(message.payload.decode("utf-8"))
    print('Received message:', mqtt_message)

mqttBroker = '103.184.113.154'
client =  mqtt.Client("led")
client.connect(mqttBroker)
client.subscribe('abc')
client.on_message = on_message
# client.loop_forever()