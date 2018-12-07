var express = require('express');
var router = express.Router();


var mysql = require('mysql')

// database logic start
//  
//  
// setup database connection
var connection = mysql.createConnection({
    host: 'sql3.freemysqlhosting.net',
    user: 'sql3268620',
    password: '5LHnvQMHJP',
    database: 'sql3268620',
    timezone: 'EST'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('database connected as id ' + connection.threadId);
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user_panel/dashboard');
});

router.get('/dashboard', function(req, res, next) {
  res.render('user_panel/dashboard');
});

router.get('/login', function (req, res, next) {
  res.render('user_panel/login', { message: '' } );
});

router.post('/login', function (req, res, next) {

  // you might like to do a database look-up or something more scalable here

  var sql = `SELECT * from users where email='` + req.body.username + `' AND password='` + req.body.password+"'";

  connection.query(sql, function (err, rows, fields) {
    if (err) throw err
    if(rows[0]) {
      req.session.authenticated = true;
      res.redirect('/users/dashboard');
      
    } else {
      req.flash('error', 'Username and password are incorrect');
      res.render('user_panel/login', { message: 'Username and password are incorrect'});
    }
  // return rows;
  });

  // if (req.body.username && req.body.username === 'user' && req.body.password && req.body.password === 'pass') {
  //   req.session.authenticated = true;
  //   res.redirect('/users/dashboard');
  // } else {
  //   req.flash('error', 'Username and password are incorrect');
  //   res.render('user_panel/login', { message: 'Username and password are incorrect'});
  // }

});

router.get('/logout', function (req, res, next) {
  delete req.session.authenticated;
  res.redirect('/');
});


module.exports = router;
