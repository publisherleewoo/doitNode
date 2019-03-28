const express = require('express')
const router = express.Router();



router.get('/', function (req, res) {
    console.log('메인')
    console.log(req)
    res.render('main.ejs')
})














module.exports = router
