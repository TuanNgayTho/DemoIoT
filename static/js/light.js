function bulbToggle(){
    let bulb = document.getElementById('lightbulb');
    const switchLight = document.getElementById('switch1').checked;
    if(bulb.src.match('lightoff')){
        bulb.src = 'static/images/lighton.jpg';
    } else {
        bulb.src = 'static/images/lightoff.jpg'
    }
}