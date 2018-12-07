var express = require("express");
var http = require("http");
var app = express();
var fs = require('fs')
var bodyParser = require('body-parser')

app.set("port", process.env.PORT || 3000);
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
     extended: false
}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
     var userAgent = req.header('User-Agent');

     // var paramName = req.body.name || req.query.name;
     res.writeHead(200, {
          "Content-Type": "text/html;charset=utf8"
     })

     res.write(`
     <p>서버측 유저에이전트 : ${userAgent}</p>
     <form action = "/" method = "post">
          <input type="text" name="name">
          <input type="submit">
     </form>
     `)

     res.end()
     next()
})


app.use(function (req, res) {
     var data = req.body.name;
     console.log(data)
})


var server = http
     .createServer(app)
     .listen(app.get("port"), "127.0.0.1", function () {
          console.log("익스프레스를 웹서버로 실행함 : " + app.get("port"));
     });