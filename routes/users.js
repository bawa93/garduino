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
  console.log(req.session.userid);




  connection.query(`SELECT * from plants where user_id=` + req.cookies.userid, function (err, rows, fields) {
    if (err) throw err
    // return rows;
    res.render('user_panel/dashboard', {
      plants:rows,
      userid: req.cookies.userid,
      username: req.cookies.name
    });
  });


  
});

router.get('/plant_show/:id', function (req, res, next) {
var sql = `SELECT * from plants where id=` + req.params.id;
// console.log(sql);
connection.query(sql, function (err, rows, fields) {
  if (err) throw err
  // return rows;
  return res.render('user_panel/plant_show', {
    plant: rows[0]
  });

  
});

});



router.get('/login', function (req, res, next) {
  res.render('user_panel/login', { message: '' } );
});

router.post('/login', function (req, res, next) {
  // you might like to do a database look-up or something more scalable here
  var sql = `SELECT * from users where email='` + req.body.email + `' AND password='` + req.body.password+"'";
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err
    if(rows[0]) {
      req.session.authenticated = true;
      req.session.userid = rows[0].id;
      req.session.name = rows[0].name;

res.cookie('userid', rows[0].id, {
  maxAge: 900000,
  httpOnly: true
});

res.cookie('name', rows[0].name, {
  maxAge: 900000,
  httpOnly: true
});
      res.redirect('/users/dashboard');
      
    } else {
      req.flash('error', 'email or password incorrect');
      res.render('user_panel/login', { message: 'email or password incorrect'});
    }
  // return rows;
  });
});

router.get('/register', function (req, res, next) {
// req.session.authenticated = 2;
console.log('session user id' + req.session.authenticated);

  res.render('user_panel/register', {
    message: ''
  });
});

router.post('/register', function (req, res, next) {


  // you might like to do a database look-up or something more scalable here
  var sql = `INSERT INTO users SET name='` + req.body.name + `',email='` + req.body.email + `',password='` + req.body.password + "'";
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err
    if (rows.insertId) {
      req.session.authenticated = true;
      req.session.userid = rows.insertId;

      res.cookie('userid', rows.insertId, {
        maxAge: 900000,
        httpOnly: true
      });

      res.cookie('name', req.body.name, {
        maxAge: 900000,
        httpOnly: true
      });
      let image = req.files.image;

      if (Object.keys(req.files).length != 0) {


        // return res.status(400).send('No files were uploaded.');

        // Use the mv() method to place the file somewhere on your server
        image.mv('public/images/users/' + rows.insertId + '.jpg', function (err) {
          if (err) {
            // return res.send(err);
            console.log(err);
          } else {
            // res.send('File uploaded!');
            res.redirect('/users/dashboard');
          }
        });
      }


      // res.redirect('/users/dashboard');

    } else {
      req.flash('error', 'Registration Failed, Pls try again');
      res.render('user_panel/register', {
        message: 'Registration Failed, Pls try again'
      });
    }
    // return rows;
  });
});


router.get('/add_plant', function (req, res, next) {
  console.log(req.cookies.userid);
  res.render('user_panel/add_plant', {
    message: ''
  });
});

router.post('/add_plant', function (req, res, next) {
  // you might like to do a database look-up or something more scalable here
  var sql = `INSERT INTO plants SET title='` + req.body.title + `',user_id=` + req.cookies.userid; + "";
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err
    if (rows.insertId) {
      // req.session.authenticated = true;
      // req.session.userid = rows.insertId;

      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let image = req.files.image;

      if (Object.keys(req.files).length != 0) {


        // return res.status(400).send('No files were uploaded.');

        // Use the mv() method to place the file somewhere on your server
        image.mv('public/images/plants/' + rows.insertId + '.jpg', function (err) {
          if (err) {
            // return res.send(err);
            console.log(err);
          } else {
          // res.send('File uploaded!');
          res.redirect('/users/dashboard');
          }
        });
      }


      


    } else {
      req.flash('error', 'Operation Failed, Pls try again');
      res.render('user_panel/add_plant', {
        message: 'Operation Failed, Pls try again'
      });
    }
    // return rows;
  });
});



router.get('/logout', function (req, res, next) {
  delete req.session.authenticated;
  res.redirect('/');
});


module.exports = router;
