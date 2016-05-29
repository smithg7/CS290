/**********************************************
Name: Gary Smith
CS290 HW Assignment: Database Interactions
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

app.use(express.static('public'));

//This route handles a GET request
//and returns the get-loopback template
app.get('/',function(req,res){
  var qParams = [];
  //Get all the parameters in the query string
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  //We can ignore body parameters since this is a GET request
  var context = {};
  //context.dataList = qParams;

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
    })
  });

  
});


//This route handles a POST request
//and returns the get-loopback template
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


  //Check to see which button sent this get request
  if(req.body['EditBtn']){
    var context = {};
    context.dataList = qParams;
    res.send(JSON.stringify(context));
    return;
  }
  
  if(req.body['DeleteBtn']){
    var context = {};
    context.dataList = qParams;
    res.send(JSON.stringify(context));
    return;
  }
  //Send the qParams array to the Function to insert them into the database
  

  //return an array of items from the databse to populate the tables with
  //An array of arrays?

  var context = {};
  var myName = req.body["Ename"];
  var insertValues = [req.body["Ename"], req.body["reps"], req.body["weight"], req.body["date"], req.body["lbs"]];
  pool.query("INSERT INTO workouts (name, reps, weight, date, lbs) VALUES ('a', 2, 2,'1/2/2016', true)",insertValues ,function(err, result){
    if(err){
      next(err);
      return;
    }
  });
    
  
  res.type("text/plain");
  pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
  });
  context.dataList = qParams;
  context.test = JSON.stringify(rows);
  res.send(JSON.stringify(context));
});



app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});



app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

function SelectAllData()
{
    pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    return (JSON.stringify(rows));
  });
}