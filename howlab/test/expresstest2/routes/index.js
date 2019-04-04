var express = require('express');
var router = express.Router();



router.use('/user', require('./user'))

/* GET home page. */
router.route('/').get(function (req, res, next) {
    console.log('도착')
    res.send('index');
});

module.exports = router;
