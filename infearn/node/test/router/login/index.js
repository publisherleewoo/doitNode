const express = require('express')
const router = express.Router();
const userModel = require('../../model/user')
const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
});

passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    done(null, user.email); // 여기의 user가 req.user가 됨
});

passport.use('local-login', new LocalStrategy({ // local 전략을 세움
    usernameField: 'email',
    passwordField: 'password',
    session: true, // 세션에 저장 여부
    passReqToCallback: false,
}, (email, password, done) => {

    userModel.poolConnection(`SELECT * FROM jsman WHERE email=?`, [email])
        .then((r) => {
            if (r[0]) {
                const cryptoPwd = crypto.scryptSync(password, r[0].salt, 64).toString('hex');
                if (cryptoPwd === r[0].password) {
                    return done(null, r[0])
                } else {
                    throw new Error('암호가 일치하지않습니다')
                }
            } else {
                throw new Error('없는 아이디입니다')
            }
        })
        .catch((err) => {
            return done(null, false, { msg: '암호가 일치하지않습니다' })
        })
}));

router.get('/', function (req, res) {
    res.render('login.ejs')
})

router.post('/',
    passport.authenticate('local-login', {
        successRedirect: '/main',
        failureRedirect: '/login'
    }));

module.exports = router
