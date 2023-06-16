var socket1 = new WebSocket('ws://localhost:8000/ws/Mqtt/');
socket1.onmessage = function(event){
    const mqtt = event.data;

    const message = JSON.parse(mqtt)
    console.log(message.d);
//    if (message.type == "boolean"){
//        let bulb = document.getElementById('lightbulb');
//        let switchLight = document.getElementById('switch1');
//
//        if (message.d.ItemValue5 !== undefined) {
//             if(message.d.ItemValue5 == "true"){
//                switchLight.checked = true;
//                bulb.src = 'static/images/lighton.jpg';
//            } else if(message.d.ItemValue5 == "false") {
//                switchLight.checked = false;
//                bulb.src = 'static/images/lightoff.jpg';
//            }
//        }
//    }
}