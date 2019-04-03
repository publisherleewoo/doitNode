const express = require('express');
const router = express.Router();
const user = require('../controller/user')
const auth = require('../auth/auth')
router.route('/user')
    .post(user.createUser)
    .get(auth.isBasicAuthenticated, user.readUser)
    .put(auth.isBasicAuthenticated, user.updateUser)
    .delete(auth.isBasicAuthenticated, user.deleteUser)

router.route('/test')
    .get((req, res) => {
        //보안상 비추
        console.log('도착')
        console.log(req.query)
        res.send('확인')
    })
    .post((req, res) => {
        console.log(req.body)
        res.send('post방식')
    })


router.route('/test/:id')
    .get((req, res) => {
        //데이터를 업데이트,삭제
        console.log('도착2')
        console.log(req.params)
        res.send('확인2')
    })



module.exports = router;