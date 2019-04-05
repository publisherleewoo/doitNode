/**
 * Created by myeongsic on 2017. 4. 5..
 */


const User = require('../models/user');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const crypto = require('crypto');

passport.use(new BasicStrategy(
    function (id, password, callback) {



        const hash = crypto.createHash('sha256')
        hash.update(password)
        let hash_password = hash.digest('hex')


        User.findOne({userName:id,password:hash_password},{password:0},(err, doc) =>{

            if(doc){
                //조건이 맞으면 doc 데이터가 넘어오며 조건이 없을경우 if(doc)이 false 된다
                callback(null, doc);
            }else {
                callback(null, false); //401 에러
            }

        })




        // // 디비에 접근을 해서 아이디랑 비밀번호를 가져와서 확인을 하는 부분
        // if (id === "study" && password === "1234") {
        //     callback(null, id);
        // } else {
        //     callback(null, false)
        // }

    }
));

exports.isBasicAuthenticated = passport.authenticate('basic', {session: false})

