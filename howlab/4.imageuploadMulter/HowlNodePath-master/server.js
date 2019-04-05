
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./route/router');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const path = require('path')
// var multer = require('multer')


mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/howl')

//mongod








app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(router)

app.listen(port, err => {
    if (err) console.log(err)
    else console.log("서버가 가동되었습니다!!")
})


