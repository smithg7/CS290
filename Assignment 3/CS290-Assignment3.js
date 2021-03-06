/**********************************************
Name: Gary Smith
CS290 HW Assignment: GET and POST

NOTE: The setup code has been copied from the example given in class

LIVE URL:  http://ec2-52-36-65-162.us-west-2.compute.amazonaws.com:3030/loopback
***********************************************/

var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3030);

app.get('/',function(req,res){
  res.render('home.handlebars') //We can omit the .handlebars extension as we do below
});

app.get('/other-page',function(req,res){
  res.render('other-page');
});


//This route handles a GET request
//and returns the get-loopback template
app.get('/loopback',function(req,res){
  var qParams = [];
  //Get all the parameters in the query string
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  //We can ignore body parameters since this is a GET request
  var context = {};
  context.dataList = qParams;
  res.render('get-loopback', context);
});

//This route handles a GET request
//and returns the get-loopback template
app.post('/loopback', function(req,res){
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
  res.render('post-loopback', context);
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