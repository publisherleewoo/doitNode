var express = require('express');
var router = express.Router();
var path = require('path')
var mysql = require('mysql')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'test'
})

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        throw err
    }
    console.log('mysql 연결', connection.state, __dirname)
});

router.get('/', function (req, res) {
    var msg;
    var errMsg = req.flash('error')
    if (errMsg) msg = errMsg;
    res.render('login.ejs', { message: msg })
})

// 아래 local-login 세션이 잘처리되면 (done),  이것이작동된후, 맨아래 .post(/)가 작동
passport.serializeUser(function (user, done) {
    console.log('passport session save :', user)
    console.log(user)
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    console.log('passport session get id :', user)
    done(null, user)
})


passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    var query = connection.query('select * from jsman where email=?', [email], function (err, rows) {

        if (err) { return done(err) } //에러
        if (rows.length) {
            console.log('existed user')
            return done(null, { email: email, id: rows[0].uid }) //아이디가 있다
        } else {

            return done(null, false, { message: 'your login info is not found' }) //아이디가 없다

        }
    })
}
))



router.post('/', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
        if (err) { return res.status(500).json(err) }
        if (!user) { return res.status(401).json(info.message) }

        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return res.json(user);
        });

    })(req, res, next)
});

module.exports = router;