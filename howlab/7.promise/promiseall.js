const request = require('request')


var naver = new Promise((resolve) => {
    request.get('https://www.naver.com', (err, res, html) => {
        resolve('naver')
    })
})


var daum = new Promise((resolve) => {
    request.get('https://www.daum.net', (err, res, html) => {
        resolve('daum')
    })
})
var google = new Promise((resolve) => {
    request.get('https://www.google.com', (err, res, html) => {
        resolve('google')
    })
})


Promise.all([naver, daum, google]).then((r) => {
    console.log('도착')
    console.log(r)
}).catch(e => {
    console.log('에러', e)
})