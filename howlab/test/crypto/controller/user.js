var User = require('../models/user')
const crypto = require('crypto');


exports.createUser = function (req, res) {
    //db로 입력하는 부분
    let userName = req.body.userName;
    let password = req.body.password;

    // const hash = crypto.createHash('sha256')
    // hash.update(password)
    // let hash_password = hash.digest('hex');

    let key = "test"

    const ciper = crypto.createCipher('aes192', key)
    const deciper = crypto.createDecipher('aes192', key)
    let encrypted_password = ciper.update(password, 'utf8', 'hex')
    encrypted_password += ciper.final('hex')

    new User({ userName, password: encrypted_password }).save((err, doc) => {
        if (doc) {
            console.log(doc)
            let target = doc.password;
            let decrpted = deciper.update(target, "hex", "utf8")
            decrpted += deciper.final('utf8')
            console.log('복호화된 패스워드' + decrpted);


            res.send('하울서버에 user가 생성되었습니다')
        }
        if (err) {
            console.log(err)
            res.send('에러')
        }
    })


}
exports.readUser = function (req, res) {
    //db로 입력하는 부분
    res.send('user가 확인되었습니다')
}
exports.updateUser = function (req, res) {
    //db로 입력하는 부분
    res.send('user가 수정되었습니다')
}
exports.deleteUser = function (req, res) {
    //db로 입력하는 부분
    res.send('user가 제거되었습니다')
}