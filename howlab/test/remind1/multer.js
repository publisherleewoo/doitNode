const express = require('express')
const app = express()
var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage })




const port = process.env.PORT || '3000'

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extends: false }))

app.get('/', (req, res) => {
    res.sendfile('./view/form.html')
})


app.post('/re', upload.single('myfile'), function (req, res, next) {
    // req.file 은 `avatar` 라는 필드의 파일 정보입니다.
    // 텍스트 필드가 있는 경우, req.body가 이를 포함할 것입니다.
    console.log(req.body)
    console.log('파일필드', req.file)
    res.send('전송완료')


})



app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('서버구동')
    }
})