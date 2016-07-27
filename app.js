var express = require('express');
var app = express();
var http = require('http').Server(app);
var router = require('./server/router');
var controllers = require('./server/controllers');

global.users = {};

app.use(express.static('public'));
app.use('/api', router);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

controllers.socketController(http);

http.listen(3000, function(){
	console.log('listening on *:3000');
});

