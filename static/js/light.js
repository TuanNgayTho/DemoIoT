function bulbToggle(){
    let bulb = document.getElementById('lightbulb');

    if(bulb.src.match('lightoff')){
        bulb.src = 'static/images/lighton.jpg';
    } else {
        bulb.src = 'static/images/lightoff.jpg'
    }
}