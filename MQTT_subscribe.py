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

        def on_message(self, mqttc, obj, msg):
            print(msg.topic + " " + str(msg.qos) + " " + str(msg.payload))
            # mqtt_message = json.loads(msg.payload)

        def run(self):
            Toppic = [("Test", 0),("Test1", 0)]
            self.connect("103.184.113.154", 1883, 60)
            self.subscribe(Toppic)

            rc = 0
            while rc == 0:
                rc = self.loop()
            return rc
    if status == 0:
        mqttc = MyMQTTClass()
        # if __name__ == '__main__':
        p1 = threading.Thread(target=mqttc.run, daemon= True, args=())
        p1.start()


