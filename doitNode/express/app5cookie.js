var express = require('express')
var bodyParser = require('body-Parser')
var app = express();
var cookiParser = require('cookie-parser');
app.set('port', process.env.PORT || 3000)

app.use(bodyParser.urlencoded({
     extended: false
}));
app.use(bodyParser.json());
app.use(cookiParser());
app.use(express.static('public'))



var router = express.Router();

router.route('/process/setUserCookie').get(function (req, res) {
     console.log('/process/setUserCookie 라우팅 함수 호출됨.')
     res.cookie('user', {
          id: 'Lee',
          name: 'hyung',
          authorized: true
     })
     setTimeout(function () {
          res.redirect('/process/showCookie')
     }, 3000)
})

router.route('/process/showCookie').get(function (req, res) {
     console.log('/process/showCookie 라우팅 함수 호출됨')
     res.send(req.cookies.user)
})


app.use('/', router);
app.all('*', function (req, res) {
     res.status(404).send('<h1>페이지를 찾을 수 없습니다</h1>')
})

app.listen(app.get('port'), function (req, res) {
     console.log('Example app listening on port 3000!');
})