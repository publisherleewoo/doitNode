var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const User = require('../model/users')

/* GET users listing. */
router.route('/')
    .get((req, res, next) => {
        const { id, password } = req.body;
        User.findOne({ id }).then(r => {
            if (!r) {
                throw new Error('찾으시는 아이디가없습니다')
            }
            return Promise.resolve(r)
        }).then(r => {
            const cryptoPwd = crypto.scryptSync(password, r.salt, 64).toString('hex');
            if (r.password === cryptoPwd) {
                console.log('로그인 성공')
                res.send(r.id + '님 안녕하세요')
            } else {
                throw new Error('비밀번호 틀렸습니다')
            }
        }).catch(e => {
            console.log(e) 
        })
    })
    .post((req, res, next) => {
        const { id, password } = req.body;
        const salt = crypto.randomBytes(64).toString('hex');
        const cryptoPwd = crypto.scryptSync(password, salt, 64).toString('hex');
        new User({
            id,
            password: cryptoPwd,
            salt
        }).save((e)=>{
			console.log(e)})
        res.send('test')

    })
    .put((req, res, next) => {
        res.send('유저 업데이트');
    })
    .delete((req, res, next) => {
        res.send('유저 삭제');
    })


module.exports = router;
