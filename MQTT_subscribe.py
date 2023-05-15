import paho.mqtt.client as mqtt
import time
import json

data = ''
class MyMQTTClass(mqtt.Client):

    def on_connect(self, mqttc, obj, flags, rc):
        # print("rc: "+str(rc))
        pass

    def on_connect_fail(self, mqttc, obj):
        # print("Connect failed")
        pass

    def on_message(self, mqttc, obj, msg):
        global data
        message = msg.payload
        # print(msg.topic+" "+str(msg.qos)+" "+str(msg.payload))
        if message != '':
            data = json.loads(msg.payload)
        else:
            pass
    def on_publish(self, mqttc, obj, mid):
        # print("mid: "+str(mid))
        pass

    def on_subscribe(self, mqttc, obj, mid, granted_qos):
        # print("Subscribed: "+str(mid)+" "+str(granted_qos))
        global data
        data = ''
        pass

    def on_log(self, mqttc, obj, level, string):
        # print(string)
        pass

    def run(self):
        self.connect("103.184.113.154", 1883, 60)
        self.subscribe("Status", 0)

        self.loop_start()
        time.sleep(8)
        rc = data

        # rc = self.loop()
        self.loop_stop()
        return rc


# If you want to use a specific client id, use
# mqttc = MyMQTTClass("client-id")
# but note that the client id must be unique on the broker. Leaving the client
# id parameter empty will generate a random id for you.
# mqttc = MyMQTTClass()
# rc = mqttc.run()



