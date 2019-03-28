const express = require('express')
const router = express.Router();

router.use('/signUp', require('./signUp'))
router.use('/login', require('./login'))
router.use('/main', require('./main'))

module.exports = router
