const express = require('express');
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
var data = [
    { title: 'cat1', image: 'cat1.png' },
    { title: 'cat2', image: 'cat2.png' },
    { title: 'cat3', image: 'cat3.png' },
]

app.use(express.static('./'))
app.get('/', function (req, res) {
    res.render('cat', { title: 'Cats', cats: data })
})

app.listen(3000)