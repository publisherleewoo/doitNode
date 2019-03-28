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




router.post('/form', function (req, res) {
    //get : req.param('email')
    console.log('폼')
    console.log(req.body.email)
    res.render('email.ejs', { 'email': req.body.email })
})

router.post('/ajax', function (req, res) {
    var email = req.body.email;
    var responseData = {};
    connection.query(`select name from jsman where email =?`, [email], function (err, rows) {
        if (err) {
            console.log('에러', err)
            throw err
        }
        if (rows[0]) {
            console.log(rows[0].name)
            responseData.result = "ok";
            responseData.name = rows[0].name;

        } else {
            responseData.result = "none";
            responseData.name = "";
        }
        res.json(responseData)

    })

})

module.exports = router;