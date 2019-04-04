const express = require('express')
const app = express();
const port = process.env.PORT || 3000



app.use(require('./routes/router'))

app.listen(port, (err) => {
    if (err) {
        throw err
    } else {
        console.log('서버 시작')
    }
})