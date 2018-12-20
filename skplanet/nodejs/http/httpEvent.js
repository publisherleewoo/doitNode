var http = require('http');
var server = http.createServer();

server.on('request', function (req, res) {
    console.log('request event')
})

server.on('connection', function (req, res) {
    console.log('connection event')
})


server.on('close', function (req, res) {
    console.log('close')
})

server.listen(3000);