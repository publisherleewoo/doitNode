var express = require('express');
var router = express.Router();
var path = require('path')
var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'test'
})
connection.connect()


router.get('/', function (req, res) {

    res.sendFile(path.join(__dirname, '../../public/join.html'))
})

router.post('/', function (req, res) {
    var body = req.body
    var email = body.email;
    var name = body.name;
    var passwd = body.password;
    var responseData = {};

    var sql = { email: email, name: name, password: passwd }
    var query = connection.query('insert into jsman set ?', sql, function (err, rows) {

        if (err) {
            throw err
        }
        if (rows[0]) {
            responseData.result = 'ok';
            responseData.data = rows[0]
        } else {
            responseData.result = 'fail';
            responseData.data = null
        }
    })
})


module.exports = router;