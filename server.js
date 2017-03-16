var path = require('path');
var express = require('express');
var app = express(); // the app returned by express() is a JavaScript Function. Not something we can pass to our sockets!

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

var server = require('http').createServer(app);

var socketio = require('socket.io');

//server.on('request', app);
var io = socketio(server);

io.on('connection', function(socket){
    console.log('A new client has connected');
    console.log(socket.id);

    socket.on('disconnect', function(){
        console.log(':(');
    })

    socket.on('draw', function(start, end, strokeColor){
        socket.broadcast.emit('draw',start,end,strokeColor)
    })
})


// app.listen() returns an http.Server object
// http://expressjs.com/en/4x/api.html#app.listen
// var server = app.listen(1337, function () {
//     console.log('The server is listening on port 1337!');
// });

server.listen(1337, function(){
    console.log('The server is listening on port 1337!');
})



