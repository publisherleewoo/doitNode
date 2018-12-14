var express = require('express')
var bodyParser = require('body-Parser')
var app = express();
var cookiParser = require('cookie-parser');
var expressSession = require('express-session')
var path = require('path');
var multer = require('multer');
var fs = require('fs');
var cors = require('cors');

app.set('port', process.env.PORT || 3000)

app.use(expressSession({
    secret: 'myKey',
    resave: true,
    saveUninitialized: true
}))
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'upload');
    },
    filename: function (req, file, callback) {
        // callback(null, file.originalname + Date.now())

        var extension = path.extname(file.originalname)
        var basename = path.basename(file.originalname, extension);
        callback(null, basename + Date.now() + extension);
    }
});

var upload = multer({
    storage: storage,
    limits: {
        files: 10,
        fileSize: 1024 * 1024 * 1024
    }
})

app.use(bodyParser.json());
app.use(cookiParser());
app.use(express.static(__dirname + '/public'))
app.use('/upload', express.static(__dirname + '/upload'))

var router = express.Router();

router.route('/photo').post(upload.array('photo', 1), function (req, res) {
    console.log('/photo 라우팅 함수 호출됨')
    var files = req.files;
    console.log('========= 업로드된 파일 ======')
    if (files.length > 0) {
        console.dir(files[0])
    } else {
        console.log('파일이 없습니다')
    }

    var originalname;
    var filename;
    var mimetype;
    var size;
    if (Array.isArray(files)) {
        for (var i = 0; i < files.length; i++) {
            originalname = files[i].originalname;
            filename = files[i].filename;
            mimetype = files[i].mimetype;
            size = files[i].size;
        }
    }
    res.writeHead(200, {
        "Content-Type": "text/html;charset=utf8"
    })
    res.write('<H1>파일 업로드 성공</H1>')
    res.write(`<p>원본파일 + ${originalname}</p>`)
    res.write(`<p>저장파일 + ${filename}</p>`)
    res.end()
})

router.route('/product').get(function (req, res) {
    console.log('/product 라우팅 함수 호출됨.');
    if (req.session.user) {
        res.redirect('/product.html')
    } else {
        res.redirect('/login2route.html')
    }


})

router.route('/login').post(function (req, res) {
    console.log('/login 라우팅 함수 호출됨. ')
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword)
    if (req.session.user) {
        console.log('이미 로그인 되어 있습니다');
        res.redirect('/product.html')
    } else {
        req.session.user = {
            id: paramId,
            name: 'Lee',
            authorized: true
        }

        res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf8'
        })
        res.write('<h1>로그인 성공</h1>')
        res.write('<p>Id :' + paramId + '</p>')
        res.write('<br/><br/><a href="/product.html">상품페이지로 이동하기</a>')
        res.write('<br/><br/><a href="/logout">로그아웃하기</a>')
        res.end();
    }
})


router.route('/logout').get(function (req, res) {
    console.log('/logout 라우팅 함수 호출됨.')
    if (req.session.user) {
        console.log('로그아웃합니다')
        req.session.destroy(function (err) {
            if (err) {
                console.log('세션 삭제시 에러발생')
                return;
            }

            console.log('세션 삭제 성공')
            res.redirect('/login2route.html')
        });
    } else {
        console.log('로그인되어있지 않습니다')
        res.redirect('/login2route.html')
    }
})





app.use('/', router);
app.all('*', function (req, res) {
    res.status(404).send('<h1>페이지를 찾을 수 없습니다</h1>')
})

app.listen(app.get('port'), function (req, res) {
    console.log('Example app listening on port 3000!');
})