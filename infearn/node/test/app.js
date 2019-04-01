const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session')
const config = require('./config')


app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use('/static', express.static(__dirname + '/public'));
app.use('/', require('./router'))



app.listen(3000, function () {
    console.log('start 3000 port!')
})

