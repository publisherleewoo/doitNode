// var client = require('cheerio-httpcli');

// client.fetch(요청 url, 파라미터, function (err, $, res, body) {
//     // body : 크롤링 해온 HTML이 담겨져있습니다.
//     // $ : 제이쿼리처럼 셀렉팅을 할 수 있습니다. 
// });


// naver.js
var express = require('express')
var app = express();
var client = require('cheerio-httpcli');
var viewer = '';


app.use(function (req, res, next) {



    client.fetch("https://comic.naver.com/webtoon/detail.nhn?titleId=318995&no=409&weekday=fri", {}, function (err, $, res, body) {
        $(".wt_viewer").children('img').each((index, item) => {
            var src = $(item).attr('src');
            viewer += `<img src=${src} style="display:block;margin:0 auto">`;
        })
        next()
    });




})




app.get('/', function (req, res) {
    res.send(viewer)
})


app.listen(3000, (err) => {
    console.log('서버구동')
})



