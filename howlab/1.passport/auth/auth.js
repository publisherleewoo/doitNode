const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

passport.use('basic', new BasicStrategy(
    function (id, password, callback) {
        //db에 접근을해서 id,password를 가져와서 확인    
        if (id === "study" && password === "1234") {
            callback(null, id)
        } else {
            callback(null, false)
        }
    }
))

exports.isBasicAuthenticated = passport.authenticate('basic', { session: false })