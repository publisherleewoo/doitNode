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
    res.render('join.ejs')
})

passport.use('local-join', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    console.log('local-join callback called')
})
)

router.post('/',
    passport.authenticate('local-join', {
        successRedirect: '/main',
        failureRedirect: '/join',
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