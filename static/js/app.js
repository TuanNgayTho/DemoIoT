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
var joke = event.data;
console.log("Message from server ", event.data);
document.querySelector('#jokes').innerText = joke;
}

var socket1 = new WebSocket('ws://localhost:8000/ws/Mqtt/');
socket1.onmessage = function(event){
const mqtt = event.data;
console.log(event.data);
document.querySelector('#mqtt').innerText = mqtt;

const massage = JSON.parse(mqtt)
for (let x in massage) {
    console.log(massage[x]);
    document.querySelector('#'+x).innerText = massage[x];
    }
}
//websocket end block