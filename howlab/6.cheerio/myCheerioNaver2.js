
const request = require('request');
const cheerio = require('cheerio');

request.get('https://www.naver.com', function (err, res, html) {
    const $ = cheerio.load(html)
    var rankList = $('div.ah_list.PM_CL_realtimeKeyword_list_base ul li')
    rankList.each(function (i, e) {
        console.log($(e).children('a').children('span').text())
    })

})


