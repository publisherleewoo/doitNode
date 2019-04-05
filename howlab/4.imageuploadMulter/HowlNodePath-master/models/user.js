/**
 * Created by myeongsic on 2017. 4. 19..
 */


const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    userName: String,
    password: String

})


module.exports = mongoose.model('user',UserSchema);
