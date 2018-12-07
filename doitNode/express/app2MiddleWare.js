var express = require('express');
var http = require('http');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(function (req, res, next) {
     console.log('첫번째 미들웨어 호출됨.')
     res.writeHead(200, {
          'Content-Type': 'text/html;charset=utf8'
     })
     res.end('<h1>서버에서 응답한 결과입니다</h1>');
})


var server = http.createServer(app).listen(app.get('port'), '127.0.0.1', function () {
     console.log('익스프레스를 웹서버로 실행함 : ' + app.get('port'))

})



// express 모듈 - > app객체  -> createServer(app) -> 미들웨어 -> 미들웨어함수 .    클라(웹브라우저)가 요청하면 미들웨어함수먼저 응답한다.