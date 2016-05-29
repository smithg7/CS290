/**********************************************
Name: Gary Smith
CS290 HW Assignment: Database Interactions
***********************************************/

var express = require('express');
var request = require('request');

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
  context.dataList = qParams;
  res.render('start', context);
});


//This route handles a POST request
//and returns the get-loopback template
app.post('/', function(req,res){
  //Collect the parameters
  var qParams = [];
  //get all the body parameters
  for (var p in req.body){
    qParams.push({'name':p,'value':req.query[p]});
  }
  //get all the query string parameters
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]});
  }

  //Check to see which button sent this get request
  if(req.body['EditBtn']){
    var ctxt = {};
    ctxt.dataList = [{'id':'1','Ename':'1','reps':'2', 'weight':'215', 'date':'1', 'lbs':true}];
    res.render('edit', ctxt);
  }
  
  //Send the qParams array to the Function to insert them into the database
  

  //return an array of items from the databse to populate the tables with
  //An array of arrays?

  var context = {};
  context.dataList = [{'id':'1','Ename':'1','reps':'2', 'weight':'215', 'date':'1', 'lbs':true}, 
                      {'id':'2','Ename':'2','reps':'2', 'weight':'215', 'date':'1', 'lbs':true}, 
                      {'id':'3','Ename':'3','reps':'2', 'weight':'215', 'date':'1', 'lbs':true}, 
                      {'id':'4','Ename':'4','reps':'2', 'weight':'215', 'date':'1', 'lbs':true}];
  res.render('DB', context);
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