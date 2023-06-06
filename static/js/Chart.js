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

    if (djangoData.ItemValue2 !== undefined) {
        var newGraphData1 = graphData.data.datasets[1].data;
        newGraphData1.shift();
        newGraphData1.push(djangoData.ItemValue2);
        graphData.data.datasets[1].data = newGraphData1;
        myChart.update();

        document.querySelector('#doam').innerText = djangoData.ItemValue2 + " %"
        };

    if (djangoData.ItemValue3 !== undefined) {
        var newGraphData = graphData.data.datasets[0].data;
        newGraphData.shift();
        newGraphData.push(djangoData.ItemValue3);
        graphData.data.datasets[0].data = newGraphData;
        myChart.update();

        document.querySelector('#nhietdo').innerText = djangoData.ItemValue3 + " °C"
        };

    if (djangoData.ItemValue1 !== undefined) {
        document.querySelector('#textbox').innerText = djangoData.ItemValue1
        };
}
//chart block end


// chart 2
const date = [];
const dataPoint = [];

async function abc(){
    const startDate = document.getElementById('startdate').value;
    const endDate= document.getElementById('enddate').value;
    let data = await makeRequest('/api/data', method='post', body=JSON.stringify({"StartDate":startDate, "EndDate":endDate,}))
    console.log(await data)

    let person = await data;
    date.splice(0,date.length)
    dataPoint.splice(0,dataPoint.length)

    for (let x in person) {
        date[x] = person[x].joindate;
        dataPoint[x] = person[x].price;
    }
    console.log(date)
    console.log(dataPoint)
    chartDate.update();
}

abc();

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
    let startTime = document.getElementById('startdate');
    let endTime = document.getElementById('enddate');

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