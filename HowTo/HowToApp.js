var express = require('express');

var app = express();


app.set('port', 3000);

app.get('/', function(req, res){
	res.redirect('/HowTo.html');
});

app.use(function(req, res, next){
        res.type('text/plain');
        res.status(404);
        res.send('404 - There is nothing here save for vast expanses of nothing');
});

app.listen(app.get('port'), function(){
        console.log( 'Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to exit' );});