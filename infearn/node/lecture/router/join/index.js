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
    res.render('join.ejs', { message: msg })
})

// 아래 local-join 세션이 잘처리되면 (done),  이것이작동된후, 맨아래 .post(/)가 작동
passport.serializeUser(function (user, done) {
    console.log('passport session save :', user.id)
    console.log(user.id)
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    console.log('passport session get id :', id)
    done(null, id)
})


passport.use('local-join', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    var query = connection.query('select * from jsman where email=?', [email], function (err, rows) {

        if (err) { return done(err) } //에러
        if (rows.length) {
            console.log('existed user')
            return done(null, false, { message: 'your email is already used' }) //아이디가 있다
        } else {
            var sql = { email: email, password: password }
            var query = connection.query('insert into jsman set ?', sql, function (err, rows) {
                if (err) throw err
                return done(null, { email: email, id: rows.insertId }) //아이디가 없다
            })
        }
    })
})
)

router.post('/',
    passport.authenticate('local-join', {
        successRedirect: '/main',   //성공하면 main
        failureRedirect: '/join',  //실패하면 join
        failureFlash: true
    })
);

// router.post('/', function (req, res) {
//     var body = req.body
//     var email = body.email;
//     var name = body.name;
//     var passwd = body.password;

//     var sql = { email: email, name: name, password: passwd }
//     var query = connection.query('insert into jsman set ?', sql, function (err, rows) {
//         console.log(rows)
//         if (err) {
//             console.log('mysql연결실패')
//         }
//         else res.render('welcome.ejs', { name: name, id: rows.insertId })
//     })
// })

module.exports = router;