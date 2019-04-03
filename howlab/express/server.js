const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const router = require('./route/router');
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded  
//false를주면 String Object로 받는다.
//true를 주면 어떤타입이든 다 받는다.
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.use(router)

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('서버가 가동되었습니다')
    }
})