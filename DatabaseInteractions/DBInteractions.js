/**********************************************
Name: Gary Smith
CS290 HW Assignment: Database Interactions
This file is the controller for the server requests
***********************************************/

var express = require('express');
var request = require('request');
var mysql = require('mysql');
var pool = mysql.createPool({
  host  : 'localhost',
  user  : 'student',
  password: 'default',
  database: 'student'
});

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4000);

//Provide the public folder access to the public
app.use(express.static('public'));

//This route handles the initial GET request for the page
//It resets the database table and shows the start page.
app.get('/',function(req,res){
  var qParams = [];
  //Get all the parameters in the query string
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  //We can ignore body parameters since this is a GET request
  var context = {};

  //Initiating query to drop the table and recreate it.
  //Code copied from class example.
  pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
      "id INT PRIMARY KEY AUTO_INCREMENT,"+
      "name VARCHAR(255) NOT NULL,"+
      "reps INT,"+
      "weight INT,"+
      "date DATE,"+
      "lbs BOOLEAN)";
    pool.query(createString, function(err){
      res.render('start', context);
    });
  });
});


//This route handles the POST requests
app.post('/', function(req,res){
  //Collect the parameters
  var qParams = [];
  //get all the body parameters
  for (var p in req.body){
    qParams.push({'name':p,'value':req.body[p]});
  }
  //get all the query string parameters
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]});
  }

  /*********************************************************
  * EDIT/SAVE button - UPDATE query
  *********************************************************/
  if(req.body['EditBtn']){
    var context = {};
    var updateValues = [req.body["Ename"], req.body["reps"], req.body["weight"], req.body["date"], req.body["lbs"], req.body["id"]];
    pool.query("UPDATE workouts SET name = ?, reps = ?, weight = ?, date = ?, lbs = ? WHERE id = ?;",updateValues ,function(err, result){
      if(err){
        context.error = err;
        return;
      }
    });
      
    //Show the table's current contents
    pool.query('SELECT * FROM workouts;', function(err, rows, fields){
      if(err){
        context.error = err;
        return;
      }
      context.dataList = rows;
      res.send(JSON.stringify(context));
    });
    return;
  }

  /*********************************************************
  * DELETE query
  *********************************************************/
  if(req.body['DeleteBtn']){
    var context = {};
    pool.query("DELETE FROM workouts WHERE id = ?;",[req.body["id"]] ,function(err, result){
      if(err){
        context.error = err;
        return;
      }
    });

    //Show the table's current contents
    pool.query('SELECT * FROM workouts;', function(err, rows, fields){
      if(err){
        context.error = err;
        return;
      }
      context.dataList = rows;
      res.send(JSON.stringify(context));
    });
    return;
  }


  /*********************************************************
  * INSERT query
  *********************************************************/
  var context = {};
  var insertValues = [req.body["Ename"], req.body["reps"], req.body["weight"], req.body["date"], req.body["lbs"]];
  pool.query("INSERT INTO workouts (name, reps, weight, date, lbs) VALUES (?, ?, ?,?, ?)",insertValues ,function(err, result){
    if(err){
      context.error = err;
      return;
    }
  });
    
  //Show the table's current contents
  res.type("text/plain");
  pool.query('SELECT * FROM workouts;', function(err, rows, fields){
    if(err){
      context.error = err;
      return;
    }
    context.dataList = rows;
    res.send(JSON.stringify(context));
  });

});


//Return the 404 page error
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

//Return the 500 error if there was a server error
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});


//Send a note to the console when the node is run.
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
