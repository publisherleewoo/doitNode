var express = require('express')
var app = express();
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.listen(3000, function () {
    console.log('start!')
})

var model = {
    a: 'hi',
    abc: 'hi2',
    abcd: 'hi3',
    b: 'bye',
    c: 'hhh'

}


app.use(express.static('public'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/main.html')
})
app.get('/main', function (req, res) {
    res.sendFile(__dirname + '/public/main.html')
})

app.get('/search', function (req, res) {
    var reqData = req.query.value;
    var result = Object.keys(model).filter(key => key.indexOf(reqData) > -1)
    res.json(result)
})