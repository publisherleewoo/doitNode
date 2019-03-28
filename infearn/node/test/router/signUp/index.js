const express = require('express')
const router = express.Router();
const userModel = require('../../model/user')
const crypto = require('crypto');




router.get('/', function (req, res) {
    res.render('signUp.ejs')
})

router.post('/check', function (req, res) {
    var { email, name, password } = req.body;

    userModel.poolConnection(`SELECT * FROM jsman WHERE email=?`, [email])
        .then(r => {
            if (!r[0]) {
                res.json({ success: true, msg: '사용가능' })
            } else {
                res.json({ success: false, msg: '사용불가' })
            }
        }).catch(err => {
            res.json({ success: false, msg: err })
        })

});

router.post('/', function (req, res) {
    var { email, name, password } = req.body;
    crypto.randomBytes(64, (err, buf) => {
        const salt = buf.toString('base64');
        const cryptoPwd = crypto.scryptSync(password, salt, 64).toString('hex');
        userModel.poolConnection(`INSERT INTO jsman (email,name,password,salt) VALUES (?,?,?,?) `, [email, name, cryptoPwd, salt])
            .then(r => {
                res.render('login.ejs', { email })
            }).catch(err => {
                res.json({ success: false, msg: err })
            })
    })
});









module.exports = router
