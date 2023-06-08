//menu navbar
function tuanthegioi()
{
    var x = document.getElementById("navbar");
    if (x.className === "globalmenu")
        {x.className += " tuan";}
    else
        {x.className = "globalmenu";}
}
//menu navbar end block

//websocket
var socket = new WebSocket('ws://localhost:8000/ws/Led/');
socket.onmessage = function(event){
var Status = JSON.parse(event.data);
let icon = document.getElementById('icon');
console.log("Message from server ", Status.model);

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
console.log(event.data);
document.querySelector('#mqtt').innerText = mqtt;

const message = JSON.parse(mqtt)

let bulb = document.getElementById('lightbulb');
let switchLight = document.getElementById('switch1');
if(message.ItemValue5 == "true"){
    switchLight.checked = true;
    bulb.src = 'static/images/lighton.jpg';
} else if(message.ItemValue5 == "false") {
    switchLight.checked = false;
    bulb.src = 'static/images/lightoff.jpg';
}

for (let x in message) {
    if(x == "ItemValue4"){
        document.querySelector('#'+x).value = message[x];
    }
    }
}
//websocket end block