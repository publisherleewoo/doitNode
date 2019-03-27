var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors');

app.listen(3000, function () {
    console.log("start, express server on port 3000");
});

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use('/', require('./router/'))
