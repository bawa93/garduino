(function(){

    "use strict"
    var socket = io();

      function getMoisture() {
        socket.on('moisture', function (data) {
            return data;
        //   document.getElementById('moisture').innerHTML = data;
        });
      }

      function getTemperature() {
        socket.on('temperature', function (data) {
            return data;
        //   document.getElementById('temperature').innerHTML = data;
        });
      }

      function getLight() {
        socket.on('light', function (data) {
            return data;
        //   document.getElementById('light').innerHTML = data;
        });
      }



})();