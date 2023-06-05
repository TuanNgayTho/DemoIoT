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
    const data = await makeRequest('/home', method='post', body=JSON.stringify({light:true}))
    console.log(await data)
}

//botton off
async function getFloatNumber(){
    let number = 4
    let data = await makeRequest('/home', method='post', body=JSON.stringify({light:false}))
    console.log(await data)
   }

//timer
async function timer(){
    let time = parseFloat(document.getElementById('ItemValue4').value);
    let data = await makeRequest('/home', method='post', body=JSON.stringify({"ItemValue4":time}))
    console.log(await data)
   }

//switchLight
async function bulbToggle(){
    let bulb = document.getElementById('lightbulb');
    let switchLight = document.getElementById('switch1').checked;
    let number =  new String(switchLight)
    let data = await makeRequest('/home', method='post', body=JSON.stringify({"ItemValue5":number}))
    console.log(await data)
}