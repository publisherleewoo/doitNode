
var express = require('express')
var app = express();
var fs = require('fs');
var client = require('cheerio-httpcli');
const puppeteer = require('puppeteer');


let viewerList = []

var viewer = new Promise((resolve, rej) => {
    client.fetch("https://comic.naver.com/webtoon/detail.nhn?titleId=318995&no=409&weekday=fri", {}, function (err, $, res, body) {
        var img = $(".wt_viewer").children('img')
        img.each((index, item) => {
            var src = $(item).attr('src');
            viewerList.push(src)
        })
        resolve(viewerList)
    })
})

var test = async () => {
    const webtoonListCut = await viewer
    const browser = await puppeteer.launch();
    for (var i = 0; i < webtoonListCut.length; i++) {
        const page = await browser.newPage();
        await page.goto(webtoonListCut[i]);
        await page.screenshot({ path: './' + i + '.jpg' });
    }
    await browser.close();

};


test()


app.listen(3000, (err) => {
    console.log('서버구동2')
})



