
const crypto = require('crypto');


crypto.randomBytes(64, (err, buf) => {
    const key = crypto.scryptSync('1234', buf.toString('base64'), 64);      //input pwd, salt, keylen
    console.log(key.toString('hex'))

})


