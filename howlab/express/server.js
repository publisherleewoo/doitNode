const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const router = express.Router();
app.use(router)
router.get('/', (req, res) => {
    res.send('홈페이지에 방문하신것을 환영')
})

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('서버가 가동되었습니다')
    }
})