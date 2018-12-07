var express = require('express')
var bodyParser = require('body-Parser')
var app = express();


app.set('port', process.env.PORT || 3000)

app.use(bodyParser.urlencoded({
     extended: false
}));
app.use(bodyParser.json());

app.use(express.static('public'))

var router = express.Router();

router.route('/process/login').post(function (req, res) {
     console.log('/process/login 라우팅 함수에서 받음');

     var paramId = req.body.id || req.query.id;
     var parampassword = req.body.password || req.query.password;

     res.writeHead(200, {
          "Content-Type": "text/html;charset=utf8"
     })
     res.write(`<h1>서버에서 로그인응답</h1>`)
     res.write(`<div><p>${paramId}</p></div>`)
     res.write(`<div><p>${parampassword}</p></div>`)
     res.end()
});

app.use('/', router);




app.listen(app.get('port'), function (req, res) {
     console.log('Example app listening on port 3000!');
})