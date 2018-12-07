var express = require('express');
var http = require('http');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(function (req, res, next) {
     console.log('첫번째 미들웨어 호출됨.')
     req.user = "Lee";
     next();
})


app.use(function (req, res, next) {
     console.log('두번째 미들웨어 호출됨.')
     res.writeHead(200, {
          'Content-Type': 'text/html;charset=utf8'
     })
     res.end('<h1>서버에서 응답한 결과입니다 : ' + req.user + '</h1>'); //첫번째에서 사용한 미들웨어를 여기서 사용
})








var server = http.createServer(app).listen(app.get('port'), '127.0.0.1', function () {
     console.log('익스프레스를 웹서버로 실행함 : ' + app.get('port'))

})