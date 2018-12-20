const exprss = require('express');
const app = exprss();
const logger = require('morgan');;
const bodyParser = require('body-parser');;



var users = [
    { id: 1, name: 'Lee', age: 30 },
    { id: 2, name: 'Kim', age: 20 },
    { id: 3, name: 'park', age: 25 }
]

app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.send('Hello world!')
})


app.get('/users', (req, res) => {

    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10)
    if (Number.isNaN(limit)) {
        res.status(400).json(users.slice(0, limit))
    } else {
        res.json(users.slice(0, limit))
    }
})

app.get('/users/:id', (req, res) => {
    //id값을 얻어낸다
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }
    //user배열을 조회
    var user = users.filter(user =>
        user.id === id
    )[0];

    if (user === undefined) {    // 
        return res.status(404).end();
    }
    //응답
    res.json((user))
})


app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) {
        return res.status(400).end();
    }
    users = users.filter(user =>
        user.id !== id
    );
    res.status(204).end();
})


app.post('/users', (req, res) => {
    const name = req.body.name;

    if (!name) {
        return res.status(400).end();
    }
    const found = users.filter(user => user.name === name).length //중복데이터
    if (found) {
        return res.status(409).end();
    }

    const id = Date.now()
    const user = { id, name }
    users.push(user)

    res.status(201).json(user)

})




module.exports = app      //테스트 하기위한 방법 및 bin www.js에서 listen을 실행하기 위한 방법