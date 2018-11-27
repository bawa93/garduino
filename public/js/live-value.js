nw.require("nwjs-j5-fix").fix();


var five = require("johnny-five");
var board = new five.Board();
var photoresister;


console.log('script run');
board.on("ready", function () {

  photoresister = new five.Sensor({
    pin: "A2",
    freq: 250,
  })

  var led = new five.Led.RGB({
    pins: { red: 6, green: 5, blue: 3 }
  });

  function changeLight() {
    // console.log(this.value);
    var percentage_value = this.scaleTo(100, 0);
    var full_value_for_chart = percentage_value + ", 100";
    console.log(full_value_for_chart);

    document.getElementById("percentage-value-chart").setAttribute('stroke-dasharray', full_value_for_chart);
    document.getElementById("percentage-value").innerHTML = percentage_value + ' %';

    var newblue = (this.value * 0.3) - 100;
    var newred = this.value * 0.1;
    var newgreen = (this.value * 0.2) - 50;
    led.color([newred, newblue, newgreen]);
  }
  photoresister.on("data", changeLight);  photoresister = new five.Sensor({
    pin: "A2",
    freq: 250,
  });

  photoresister.on("data", changeLight);
});
