// Express 기본 모듈 불러오기
var express = require('express')
    , http = require('http')
    , path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , static = require('serve-static')
    , errorHandler = require('errorhandler');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
var expressSession = require('express-session');

//mysql
var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'test',
    debug: false
});

// crypto 모듈 불러들이기
var crypto = require('crypto');


// 익스프레스 객체 생성
var app = express();


// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }))

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())

// public 폴더를 static으로 오픈
app.use('/public', static(path.join(__dirname, 'public')));

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));



//===== 라우팅 함수 등록 =====//

// 라우터 객체 참조
var router = express.Router();

router.route('/process/adduser2').post(function (req, res) {
    console.log('/process/adduser 라우팅 함수 호출됨.');
    var paramId = req.body.id;
    var paramPassword = req.body.password;
    var paramName = req.body.name;
    var paramAge = req.body.age;

    console.log('요청 파라미터 : ' + paramId + ',' + paramPassword + ',' + paramName + ',' + paramAge)

    addUser(paramId, paramName, paramAge, paramPassword, function (err, addedUser) {
        if (err) {
            console.log('에러 발생 : ');
            res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
            res.write('<h2>에러 발생</h2>');
            res.end();
            return;
        }

        if (addedUser) {
            console.dir(addedUser)
            res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
            res.write('<h1>사용자 추가 성공</h1>');
            res.end();
        } else {
            console.log('에러 발생 : ');
            res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
            res.write('<h2>사용자 추가 실패</h2>');
            res.end();
        }
    })
})






// 라우터 객체 등록
app.use('/', router);


var addUser = function (id, name, age, password, callback) {
    console.log('addUser 호출됨.')
    pool.getConnection(function (err, conn) {
        if (err) {
            if (conn) {
                conn.release();
            }

            callback(err, null);
            return;
        }
        console.log('데이터베이스 연결의 스레드 아이디 : ' + conn.threadId)

        var data = { id: id, name: name, age: age, password: password }
        var exec = conn.query('INSERT INTO users set ?', data, function (err, result) {
            conn.release();
            console.log('실행된 SQL : ' + exec.sql);

            if (err) {
                console.log('SQL 실행시 에러 발생')
                callback(err, null)
                return;
            }

            callback(null, result);
        })

    });
}






// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);




// Express 서버 시작
http.createServer(app).listen(app.get('port'), function () {
    console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

    // 데이터베이스 연결을 위한 함수 호출


});
