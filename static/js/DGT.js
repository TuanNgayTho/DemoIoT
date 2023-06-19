var socket1 = new WebSocket('ws://localhost:8000/ws/Mqtt/');
socket1.onmessage = function(event){
    const mqtt = event.data;

    const message = JSON.parse(mqtt)
    if (message.type == "boolean" & message.topic == "Test2"){
//        console.log(message.d);
        for (let name in message.d) {
            let classLight = document.getElementsByClassName(name);
            let size = Object.keys(classLight).length;
            let url = message.d[name]
            for (let i = 0; i < size; i++) {
//                console.log(classLight[i].src);
                if (url == "true") {
                    classLight[i].src = "static/images/DGT/" + name + "true.png"
                } else if(url == "false") {
                    classLight[i].src = "static/images/DGT/" + name + "false.png"
                }
            }
        }
    }
}

//Check SRC
function DGT(){
    let Light = document.getElementsByClassName("do1");
    let abc = Light.src;
    console.log(Light[0].src)
    console.log(Light[1].src)
}