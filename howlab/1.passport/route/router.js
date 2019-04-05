const express = require('express');
const router = express.Router();
const user = require('../controller/user')
const auth = require('../auth/auth')
router.route('/user')
    .post(user.createUser)
    .get(auth.isBasicAuthenticated, user.readUser)
    .put(auth.isBasicAuthenticated, user.updateUser)
    .delete(auth.isBasicAuthenticated, user.deleteUser)

module.exports = router;