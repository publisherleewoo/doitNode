exports.createUser = function (req, res) {
    res.send('유저생성')
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
