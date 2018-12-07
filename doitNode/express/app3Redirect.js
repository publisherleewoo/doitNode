var express = require('express');
var http = require('http');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(function (req, res, next) {
     console.log('첫번째 미들웨어 호출됨.')
     var userAgent = req.header('User-Agent');
     var paramName = req.query.name;


     res.writeHead(200, {
          "Content-Type": "text/html;charset=utf8"
     })
     res.write(`
     <h3>서버에서 응답. user-Agent : ${userAgent}</h3>
     <p>params값 : ${paramName}</p>
     `);
     res.end();
})

var server = http.createServer(app).listen(app.get('port'), '127.0.0.1', function () {
     console.log('익스프레스를 웹서버로 실행함 : ' + app.get('port'))
})