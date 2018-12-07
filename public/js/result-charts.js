(function() {

  "use strict";


  
  
  var liveMoistureEmpty = `${liveMoistureVal},` + (100-liveMoistureVal);

  console.log(liveMoistureVal);
  var moistureChartLive = new Chart(document.getElementById("chart-area"), {
    type: 'pie',
    data: {
      labels: ["Moisture", ''],
      datasets: [{
        label: "Moisture Level",
        backgroundColor: ["#3e95cd", "#eee"],
        data: [60,40]
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Live Moisture Reading'
      }
    }
  });


  var moistureChartHistory = new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
      labels: ["12:00", "12:10", "12:15", "12:30"],
      datasets: [
        {
          label: "Moisture",
          backgroundColor: "#3e95cd",
          data: [133,221,783,950]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Recent Moisture Readings'
      }
    }
  });

  var masterChart = new Chart(document.getElementById("bar-chart-grouped"), {
    type: 'bar',
    data: {
      labels: ["1900", "1950", "1999", "2050"],
      datasets: [
        {
          label: "Moisture",
          backgroundColor: "#3e95cd",
          data: [55,44,66,75]
        }, {
          label: "Light",
          backgroundColor: "#8e5ea2",
          data: [78,68,85,45]
        },
        {
          label: "Temperature",
          backgroundColor: "#ce7322",
          data: [56,63,76,34]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Recent Temperature Moisture, Light values'
      }
    }
  });

})();
