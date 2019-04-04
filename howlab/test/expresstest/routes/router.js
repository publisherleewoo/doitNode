const express = require('express')
const router = express.Router();
const user = require('../controller/user')
const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;



passport.use('local', new LocalStrategy(
    function (username, password, done) {
        if (username === 'study' && password === "1234") {                //test가 get 방식이기때문에, url에 http://localhost:3000/test?username=study&password=1 로 쳐보면 알수있음
            return done(null, username); //성공
        } else {
            return done(null, false); //실패
        }
    }
));

router.route('/test').get(
    passport.authenticate('local', { session: false }), function (req, res) {
        res.send('테스트')
    }
)


router.route('/user')
    .get(user.readUser)
    .post(user.createUser)
    .put(user.updateUser)
    .delete(user.deleteUser);

module.exports = router