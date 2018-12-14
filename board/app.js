var express = require("express");
var app = express();
var hostname = "127.0.0.1";
var port = 3000;
var apiRouter = require("./api/index");
var session = require('express-session')
var cors = require('cors');

app.use(cors())


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))



app.use("/static", express.static(__dirname + "/static"));
app.use("/views", express.static(__dirname + "/views"));
app.use("/api", apiRouter);


app.use("*", function (req, res) {
    res.status(404).send('404 페이지가없z니다')
})

app.listen(port, hostname, function (req, res) {
    console.log(`start server http://${hostname}:${port} `);
});
