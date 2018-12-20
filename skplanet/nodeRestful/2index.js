const exprss = require('express');
const app = exprss();
const logger = require('morgan');;
const users = [
    { name: 'Lee', age: 30 },
    { name: 'kim', age: 20 },
]

app.use(logger('dev'));

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/users', (req, res) => {
    res.writeHead(200, {
        "Content-Type": "application/json"
    })
    res.write(JSON.stringify(users))
    res.end()
})

app.listen(3000, () => {
    console.log('running');
})