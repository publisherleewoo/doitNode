var express = require('express');
var app = express();
var morgan = require('morgan');

app.use(morgan('dev'));

app.get('/hello', function (req, res) {
    res.send('get request, / ')
})

app.get('/movies', function (req, res) {
    res.send('get request, /movies')
})

app.listen(3000)