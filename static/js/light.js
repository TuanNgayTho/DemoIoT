function bulbToggle(){
    let bulb = document.getElementById('lightbulb');
    const switchLight = document.getElementById('switch1').checked;
    if(bulb.src.match('lightoff')){
        bulb.src = 'static/images/lighton.jpg';
    } else {
        bulb.src = 'static/images/lightoff.jpg'
    }
}

//function request
async function makeRequest(url, method, body){
    let headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    }

    if (method == 'post'){
        const csrf = document.querySelector('[name=csrfmiddlewaretoken]').value
        headers['X-CSRFToken'] = csrf
    }

    let response = await fetch(url, {
    method: method,
    headers: headers,
    body: body,
    })
    return await response.json()
}


//button on
async function getNumber(){
    const data = await makeRequest('/home', 'get')
    console.log(await data)
}

//botton off
async function getFloatNumber(e){
    let number = 4
    let data = await makeRequest('/home', method='post', body=JSON.stringify({number: number}))
    console.log(await data)
   }