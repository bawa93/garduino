var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// board specific requirements
// 
// 
// 
var moistureSensor, tempSensor, lightSensor;
var five = require("johnny-five"); // Load the node library that lets us talk JS to the Arduino
var board = new five.Board(); // Connect to the Arduino using that library

let httpServer = require('http').Server(app)
let io = require('socket.io')(httpServer); 
var mysql = require('mysql')



// database logic start
//  
//  
// setup database connection
var connection = mysql.createConnection({
    host: 'sql3.freemysqlhosting.net',
    user: 'sql3268620',
    password: '5LHnvQMHJP',
    database: 'sql3268620'
});


connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});


//connection.end()


// databse logic end
// socket logic start

io.on('connection', function(socket) {


});


// socket logic end
// 




// board ready code here
// 
// 
// 
// 
board.on("ready", function() {

    // setup moisture sensor to correct pin
    // setup temperature sensor LM35
    tempSensor = new five.Thermometer({
        controller: 'LM35',
        pin: 'A1',
        freq: 250
    });

    // setup moisture sensor to correct pin
    moistureSensor = new five.Sensor({
        pin: 'A2',
        freq: 250
    });

    // setup light sensor to correct pin
    lightSensor = new five.Sensor({
        pin: 'A3',
        freq: 250
    });
});

//

// board ready code end
//  

// process sensor data

setInterval(function() {
    emitChartData(io, tempSensor, lightSensor, moistureSensor)
}, 1000)

// save measurement to rethinkdb on each interval
setInterval(function() {
    saveRecordings(connection, tempSensor, lightSensor, moistureSensor)
}, 10000)



// process sensor data end

var app = express();


// functions
// 
// 
// 
// 
// 
function emitChartData(io, tempSensor, lightSensor, moistureSensor) {

}

function saveRecordings(connection, tempSensor, lightSensor, moistureSensor) {

    // console.log(moistureSensor);
    var tempVal = optimizeTemp(tempSensor);
    var lightVal = optimizeLight(lightSensor);
    var moistureVal = optimizeMoisture(moistureSensor);

    console.log(moistureVal);
    // console.log(tempVal);

    connection.query('INSERT INTO `readings` (`id`, `plant_id`, `moisture`, `temperature`, `light`, `updated_at`) VALUES (NULL, ' + `"1", "${moistureVal}", "455", "333", CURRENT_TIMESTAMP);`, function(err, rows, fields) {
        if (err) throw err

        console.log('item was inserted: ', rows[0])
    });

}

function optimizeTemp(tempSensor) {
    return Math.round(tempSensor.fahrenheit - 25)
}

// get light measurement
function optimizeLight(lightSensor) {
    return Math.round(lightSensor.value / 1023 * 100)
}

// get moisture measurement
function optimizeMoisture(moisture) {
    return Math.round(moisture.value / 1023 * 100)
}




// functions end

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
