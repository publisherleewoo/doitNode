
var User = require('../models/user')

exports.createUser = function (req, res) {
    //db로 입력하는 부분
    let userName = req.body.userName;
    let password = req.body.password;
    new User({ userName, password }).save((err, doc) => {
        if (doc) {
            console.log(doc)
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