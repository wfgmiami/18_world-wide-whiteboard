var path = require('path');
var express = require('express');
var app = express(); // the app returned by express() is a JavaScript Function. Not something we can pass to our sockets!

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

var server = require('http').createServer(app);

var socketio = require('socket.io');

var draws = {};
var io = socketio(server);
var room;

io.on('connection', function(socket){

    socket.on('draw', function(start, end, color){

        draws[room].push({ start: start, end: end, color: color })
        socket.broadcast.to(room).emit('draw', start, end, color);
    })

    socket.on('joinRoom', function(roomName){
        room = roomName
        socket.join(roomName);
        if( !draws[roomName] ) draws[roomName] = [];
        else socket.emit('drawHistory', draws[roomName]);
    })
})


// app.listen() returns an http.Server object
// http://expressjs.com/en/4x/api.html#app.listen
// var server = app.listen(1337, function () {
//     console.log('The server is listening on port 1337!');
// });
var port = process.env.PORT || 3000;
server.listen(port, function(){
    console.log('The server is listening on port 3000!');
})



