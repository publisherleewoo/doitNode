
var express = require('express');
var router = express.Router();
var path = require('path')

router.get('/main', function (req, res) {

    res.sendFile(path.join(__dirname, '../public/main.html'))
});


module.exports = router;