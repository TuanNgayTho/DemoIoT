import mysql.connector
def insertSQL(data):
  mydb = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="root",
    database="demo_web_iot"
  )
  mycursor = mydb.cursor()
  sql = "INSERT INTO led_sensor (temperature, humidity, timestamp) VALUES (%s, %s, %s)"
  val = data
  mycursor.execute(sql, val)
  mydb.commit()
  print(data)