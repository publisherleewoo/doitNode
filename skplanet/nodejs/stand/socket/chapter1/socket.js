var express = require('express');
var http = require('http');
var app = express();

var server = http.createServer(app);

server.listen(3000)

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client.html')
})

var io = require('socket.io')(server)
io.on('connect', function (socket) {
    console.log('클라접속')
    socket.on('disconnect', function () {
        console.log('클라 접속종료')
    })
    setInterval(function () {
        socket.emit('message', '메세지')
    }, 3000)

})