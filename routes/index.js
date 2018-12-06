var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

router.get('/temperature', function (req, res, next) {
  res.render('temperature')
})

router.get('/light', function (req, res, next) {
  res.render('light')
})

router.get('/moisture', function (req, res, next) {
  res.render('moisture')
})


// Routes for data
router.get('/api/temps', function (req, res, next) {
  getAllTemperatureMeasurements(function (err, measurements) {
    if (err) { console.log(err) }

    res.write(JSON.stringify(measurements))
    res.end()
  })
})

router.get('/api/light', function (req, res, next) {
  getAllLightMeasurements(function (err, measurements) {
    if (err) { console.log(err) }

    res.write(JSON.stringify(measurements))
    res.end()
  })
})

router.get('/api/moisture', function (req, res, next) {
  getAllMoistureMeasurements(function (err, measurements) {
    if (err) { console.log(err) }

    res.write(JSON.stringify(measurements))
    res.end()
  })
})



module.exports = router;
