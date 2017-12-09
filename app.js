var express = require('express');
var app = express();
var http = require('http').Server(app);
var router = require('./server/router');
var controllers = require('./server/controllers');

var server_port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    server_ip_address   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

global.users = {};

app.use(express.static('public'));
app.use('/api', router);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

controllers.socketController(http);

http.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});

