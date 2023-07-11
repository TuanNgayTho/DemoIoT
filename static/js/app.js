//websocket
var socket = new WebSocket('ws://localhost:8000/ws/Led/');
socket.onmessage = function(event){
    var Status = JSON.parse(event.data);
    let icon = document.getElementById('icon');
    //console.log("Message from server ", Status.model);

    if (Status.model == "GT070E"){
        icon.style = 'font-size: 1.8em; color: lightgreen;';
        document.querySelector('#textbox').innerText = Status.model;
    }else if (Status.model == "Disconnect"){
        icon.style = 'font-size: 1.8em; color: black;';
        document.querySelector('#textbox').innerText = Status.model;
    }
}

var socket1 = new WebSocket('ws://localhost:8000/ws/Mqtt/');
socket1.onmessage = function(event){
    const mqtt = event.data;

    const message = JSON.parse(mqtt)
//    console.log(message.d);
    if (message.type == "boolean"){
        let bulb = document.getElementById('lightbulb');
        let bulb1 = document.getElementById('lightbulb1');
        let switchLight = document.getElementById('switch1');

        if (message.d.ItemValue5 !== undefined) {
             if(message.d.ItemValue5 == "true"){
                switchLight.checked = true;
                bulb.src = 'static/images/lighton.jpg';
            } else if(message.d.ItemValue5 == "false") {
                switchLight.checked = false;
                bulb.src = 'static/images/lightoff.jpg';
            }
        }
        if (message.d.light !== undefined) {
             if(message.d.light == "true"){
                bulb1.src = 'static/images/lighton.jpg';
            } else if(message.d.light == "false") {
                bulb1.src = 'static/images/lightoff.jpg';
            }
        }
    }

    if (message.type == "value"){
        for (let x in message.d) {
            if(x == "ItemValue4"){
                document.querySelector('#'+x).value = message.d[x];
            }
            if(x == "ItemValue1"){
                document.querySelector('#'+x).innerHTML = message.d[x];
            }
        }
    }
}
//websocket end block