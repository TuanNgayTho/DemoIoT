//chart block
var socket2 = new WebSocket('ws://localhost:8000/ws/Mqtt/');
const ctx = document.getElementById('myChart');

var graphData = {
    type: 'line',
        data: {
              labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: ['rgba(73, 198, 230, 0.5)'],
                borderWidth: 1,
                fill: true,
                tension: 0.3,
              }]
        },
    options: {
        animations: {
          tension: {
            duration: 1500,
            easing: 'linear',
            from: 0.5,
            to: 0.3,
            loop: false,
          }
        },
        scales: {
          y: { // defining min and max so hiding the dataset does not change scale range
            min: -50,
            max: 50
          }
        }
      }
};

var myChart = new Chart(ctx, graphData);

socket2.onmessage = function(e){
    var djangoData = JSON.parse(e.data);
    console.log(djangoData.ItemValue2);

    var newGraphData = graphData.data.datasets[0].data;
    newGraphData.shift();
    newGraphData.push(djangoData.ItemValue2);

    graphData.data.datasets[0].data = newGraphData;
    if (djangoData.ItemValue2 !== undefined) {
        myChart.update();
        document.querySelector('#app').innerText = djangoData.ItemValue2};
    }
//chart block end