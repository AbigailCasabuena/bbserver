/*const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);

var appx = require('express')();
var serverx = require('http').Server(appx);
var io = require('socket.io')(serverx);

server.listen(port);
console.log('listening on port ' + port);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
*/

//var express = require('express');
const app =  require('./app');
//var server = require('http').Server(app);
//const port = process.env.PORT || 3000;
//var socketio = require('socket.io');
//var websocket = socketio(server);
//var io = require('socket.io')(server); xxx

//server.listen(port);
//console.log("listening on port " + port);

/*
  websocket.on('connection', (socket) => {
    console.log('A client just joined on', socket.id);
    socket.on('hello',()=>{
        socket.emit('xx');
    })
    
});
*/