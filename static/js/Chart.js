//chart block
var socket2 = new WebSocket('ws://localhost:8000/ws/Mqtt/');
const ctx = document.getElementById('myChart');

var graphData = {
    type: 'line',
        data: {
              labels: ['Mon', 'Tue', 'Wen', 'Fri', 'Sat', 'Sun'],
              datasets: [{
                label: 'Temperature',
                data: [12, 39, 30, 36, 42, 33],
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
            min: 00,
            max: 50
          }
        },
        plugins: {
            legend: {
                display: false,
                labels: {
                    color: 'rgb(255, 99, 132)'
                }
            }
        },
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


// chart 2
const labels = ['Mon', 'Tue', 'Wen', 'Fri', 'Sat', 'Sun','data']
const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
            legend: {
                display: false,
                labels: {
                    color: 'rgb(255, 99, 132)'
                }
            }
        },
  },
};
const chartBar = document.getElementById('myChart1');
new Chart(chartBar,config);