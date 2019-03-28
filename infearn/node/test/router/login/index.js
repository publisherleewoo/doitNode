const express = require('express')
const router = express.Router();
const userModel = require('../../model/user')
const crypto = require('crypto');


router.get('/', function (req, res) {
    res.render('login.ejs')
})

router.post('/', function (req, res) {
    const { email, password } = req.body
    userModel.poolConnection(`SELECT * FROM jsman WHERE email=?`, [email])
        .then((r) => {
            if (r[0]) {
                const cryptoPwd = crypto.scryptSync(password, r[0].salt, 64).toString('hex');
                if (cryptoPwd === r[0].password) {
                    res.render('main.ejs', { user: { email: r[0].email } })
                } else {
                    throw new Error('암호가 일치하지않습니다')
                }
            } else {
                throw new Error('없는 아이디입니다')
            }
        })
        .catch((err) => {
            res.render('block.ejs', { suecess: false, msg: err.message })
        })

})


module.exports = router
