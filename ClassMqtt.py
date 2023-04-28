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


massage = {'d': {'ItemValue1': 1111, 'ItemValue2': -9999, 'ItemValue3': 11.11, 'ItemValue4': 'TuanNgayTho'}, 'ts': '2023-04-27T17:46:06.883448'}
if __name__ == "__main__":
    analyze= ClassMqtt()
    analyze.analyze_topic('Test', massage)
