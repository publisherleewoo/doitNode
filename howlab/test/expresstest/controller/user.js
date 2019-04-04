var User = require('../model/user')


exports.createUser = function (req, res) {
    let userName = req.body.userName;
    let passwor = req.body.password;

    new User({ userName, passwor }).save((err, doc) => {
        if (doc) {
            console.log(doc)
            res.send('leewootest에 user가 생성되었습니다')
        }
        if (err) {
            console.log(err)
            res.send('에러')
        }
    })

}

exports.readUser = function (req, res) {
    res.send('유저가져오기')
}

exports.updateUser = function (req, res) {
    res.send('유저수정')
}

exports.deleteUser = function (req, res) {
    res.send('유저삭제')
}
