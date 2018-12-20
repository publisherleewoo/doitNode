const exprss = require('express');
const app = exprss();
const logger = require('morgan');;

var users = [
    { id: 1, name: 'Lee', age: 30 },
    { id: 2, name: 'Kim', age: 20 },
    { id: 3, name: 'park', age: 25 }
]

app.use(logger('dev'));


app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.get('/users', (req, res) => {
    res.json(users)
})

// app.listen(3000,()=>{
//     console.log('실행')
// })   
// superTest의 require가 자동으로 listen하게 만들어서 실행시킨다


module.exports = app      //테스트 하기위한 방법