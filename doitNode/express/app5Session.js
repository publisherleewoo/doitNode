var express = require('express')
var bodyParser = require('body-Parser')
var app = express();
var cookiParser = require('cookie-parser');
var expressSession = require('express-session')

app.set('port', process.env.PORT || 3000)

app.use(expressSession({
     secret: 'myKey',
     resave: true,
     saveUninitialized: true
}))

app.use(bodyParser.urlencoded({
     extended: false
}));

app.use(bodyParser.json());
app.use(cookiParser());
app.use(express.static('public'))



var router = express.Router();



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