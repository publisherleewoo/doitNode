const express = require('express');
const app = express()
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use('/static', express.static(__dirname + '/public'));
app.use('/', require('./router'))



app.listen(3000, function () {
    console.log('start 3000 port!')
})

