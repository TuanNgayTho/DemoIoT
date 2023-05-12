import paho.mqtt.publish as publish
import json
import paho.mqtt.client as mqtt

class ClassMqtt:
    topic = ""
    msg = ""
    topicname = ""
    def __int__(self, topic, msg, topicname):
        self.topic = topic
        self.msg = msg

    def analyze_topic(self, topicname, msg):
        if topicname == "Test":
            data = msg["d"]
            for x in data:
                print(data[x])

    def publishmqtt(self, topicname, msg):
        massage = {
            "d":
                msg,
            "ts": ""
        }
        massageJson = json.dumps(massage)
        publish.single(topicname, payload=massageJson, qos=0, retain=False, hostname="103.184.113.154",
               port=1883, client_id="", keepalive=60, will=None, auth=None, tls=None,
               protocol=mqtt.MQTTv311, transport="tcp")

abc = {'ItemValue5': True}
if __name__ == "__main__":
    analyze= ClassMqtt()
    # analyze.analyze_topic('Test', massage)
    analyze.publishmqtt('Test', abc)
