/**********************************************
Name: Gary Smith
CS290 HW Assignment: Database Interactions
***********************************************/

var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4000);


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

app.get('/MainJS.js', function(req, res){
  res.sendFile(__dirname + '/MainJS.js');
});

//This route handles a GET request
//and returns the get-loopback template
app.post('/', function(req,res){
  var qParams = [];
  //get all the body parameters
  for (var p in req.body){
    qParams.push({'name':p,'value':req.body[p]})
  }
  //get all the query string parameters
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = qParams;
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