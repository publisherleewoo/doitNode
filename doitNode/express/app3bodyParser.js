var express = require("express");
var http = require("http");
var app = express();
var bodyParser = require('body-parser')

app.set("port", process.env.PORT || 3000);
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
     extended: false
}));
app.use(bodyParser.json());
app.use(function (req, res) {
     var userAgent = req.header('User-Agent');
     var paramId = req.body.id || req.query.id;
     res.writeHead(200, {
          "Content-Type": "text/html;charset=utf8"
     })

     res.write(`
     <p>서버측 유저에이전트 : ${userAgent}</p>
     <p>서버측 파라메타 : ${paramId}</p>
      `)

     res.end()

})



var server = http
     .createServer(app)
     .listen(app.get("port"), "127.0.0.1", function () {
          console.log("익스프레스를 웹서버로 실행함 : " + app.get("port"));
     });