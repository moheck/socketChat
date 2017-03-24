// Setup basic express server
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
})

// // Chatroom
