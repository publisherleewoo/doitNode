const cheerio = require('cheerio')
const axios = require('axios');


axios.get('https://www.naver.com/')
    .then(r => {
        let $ = cheerio.load(r.data)
        var rankTest = [];

        $('.ah_roll_area.PM_CL_realtimeKeyword_rolling .ah_l').find('.ah_item').children('a').each(function (index, span) {
            var rank = $(span).children('.ah_r').text();
            var text = $(span).children('.ah_k').text();
            rankTest.push({ rank, text })
        })
        return rankTest
    }).then(r => {
        console.log(r)
    }).catch(e => {
        console.log(e)
    })

