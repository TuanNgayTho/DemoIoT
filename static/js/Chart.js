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
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderWidth: 1,
                fill: true,
                tension: 0.3,
              },{
                label: 'Humidity',
                data: [63, 69, 60, 66, 62, 63],
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
            max: 100,
          }
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'rgb(255, 99, 132)'
                }
            }
        },
    },
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
        document.querySelector('#doam').innerText = djangoData.ItemValue2 + " %"
        };
    if (djangoData.ItemValue3 !== undefined) {
        myChart.update();
        document.querySelector('#nhietdo').innerText = djangoData.ItemValue3 + " °C"
        };
    if (djangoData.ItemValue1 !== undefined) {
        document.querySelector('#textbox').innerText = djangoData.ItemValue1
        };
}
//chart block end


// chart 2
const date = ['2023-05-08', '2023-05-09', '2023-05-10', '2023-05-11', '2023-05-12', '2023-05-13','2023-05-14'];
const dataPoint = [65, 59, 80, 81, 56, 55, 40];
const data = {
  labels: date,
  datasets: [{
    label: 'My First Dataset',
    data: dataPoint,
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
const chartDate = new Chart(chartBar,config);
function filterData(){
    const date2 = [...date];
    console.log(date2);
    const startTime = document.getElementById('startdate');
    const endTime = document.getElementById('enddate');

    // get index number in array
    const indexStartDate = date2.indexOf(startTime.value);
    const indexEndDate = date2.indexOf(endTime.value);
    console.log(indexStartDate);

    //slice the array (pie) only show  the selected section/slice
    const filterDate = date2.slice(indexStartDate,indexEndDate + 1);

    //replace the label in the chart
    data.labels = filterDate;
    chartDate.update();
}
//chart2 block end