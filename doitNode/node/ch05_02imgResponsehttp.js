var http = require('http');
var fs = require('fs');

var server = http.createServer();

var host = '127.0.0.1';
var port = 3000;

server.listen(port, host, 50000, function () {
     console.log('웹서버 실행됨');
})

server.on('connection', function (socket) {
     console.log('클라이언트가 접속했습니다')
})
server.on('request', function (req, res) {
     console.log('클라이언트 요청이 들어왔습니다')

     var filename = "house.png";
     fs.readFile(filename, function (err, data) {
          res.writeHead(200, {
               "Content-Type": "image/png"
          })
          res.write(data);
          res.end();
     })

})