var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mysql_dbc = require('../db/db_con');
var connection = mysql_dbc();
var cookieParser = require('cookie-parser')
var form = require('../lib/form');

var showid = null;

router.use(cookieParser())
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/login', function (req, res) {
    res.render('login')
})

router.get('/product', function (req, res) {
    var logoutBtn = form.logoutBtn();

    res.render('product', { id: showid, logoutBtn: logoutBtn });
})


router.post('/processlogin', function (req, res) {
    var id = req.body['u_id'];
    var ps = req.body['u_ps'];
    var val = [id, ps]

    connection.query(`SELECT * FROM user_info WHERE id =? AND password=?`, val, function (error, results, fields) {
        if (error) throw error;
        if (results.length === 0) {
            res.send(`
            <h1>로그인 실패</h1>
            <a href="/api/login">로그인하러가기</a>
            `)
        } else {
            if (req.body['remember-me']) {
                res.cookie('remember', id)
            } else {
                res.clearCookie("remember");
            }
            req.session.login = true;
            showid = id;
            res.redirect('./product')
        }
    });
})

router.post('/logout', function (req, res) {
    var logout = req.body.logout;
    if (logout) {
        req.session.destroy(function (err) {
            if (err) {
                console.log('세션이 제거되지않음');
                throw err;
            }
        })
        res.render('login')
    }
})



module.exports = router;