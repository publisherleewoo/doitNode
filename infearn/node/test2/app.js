var express = require('express'); //express 모듈 가져옴 
var path = require('path');
var app = express()  //익스프레스 프레임워크 실행

app.listen(3000, function () { //3000번 포트에 리슨(포트에 연결)
    console.log('hi')
})


//request 브라우저에서 서버로 요청시 보내는 매개변수
//response는 접속시 보내주는값

app.get('/test', function (req, res) {

    // console.log()
    res.sendFile(path.join(__dirname, 'test.html'))

})

app.get('/a', function (req, res) {
    res.send('test')
})
