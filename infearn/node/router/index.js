var express = require('express');
var router = express.Router();
var path = require('path')

//url routing
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/main.html'))
});

router.use('/main', require('./main/main'))
router.use('/email', require('./email/email'))
router.use('/join', require('./join'))


module.exports = router