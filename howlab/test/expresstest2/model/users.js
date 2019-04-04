const mongoose = require('mongoose');

const User = new mongoose.Schema({
    id: String,
    password: String,
    salt: String
});

module.exports = mongoose.model('users', User);