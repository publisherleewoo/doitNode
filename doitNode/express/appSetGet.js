var express = require('express');
var http = require('http');
var app = express();

app.set('port', process.env.PORT || 3000) //환경변수의정보나 3000이라는 포트 사용
app.set('hi', 'app안의 속성값 지정') //
var server = http.createServer(app).listen(app.get('port'), function () {
     console.log('익스프레스로 웹서버를 실행함 : ' + app.get('port'))
     console.log('hi = ' + app.get('hi'))
});