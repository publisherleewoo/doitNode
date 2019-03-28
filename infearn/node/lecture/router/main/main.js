var express = require('express');
var router = express.Router();
var path = require('path')


router.get('/', function (req, res) {
    var id = req.user;
    if (!id) res.render('login.ejs')
    // res.sendFile(path.join(__dirname, '../../public/main.html'))
    res.render('main.ejs', { id: id })
});


module.exports = router;