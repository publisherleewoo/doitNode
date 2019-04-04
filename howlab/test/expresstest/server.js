const express = require('express')
const app = express();
const port = process.env.PORT || 3000
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
mongoose.connect('mongodb://localhost/leetest', { useNewUrlParser: true })

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('연결')
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//라우터
app.use(require('./routes/router'))

app.listen(port, (err) => {
    if (err) {
        throw err
    } else {
        console.log('서버 시작')
    }
})