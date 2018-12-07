var url = require('url')
var urlStr = 'https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=pop'
var curUrl = url.parse(urlStr);


console.log(curUrl)

console.log('query ->' + curUrl.query)

var curStr = url.format(curUrl)
console.log(curStr)

var querystring = require('querystring');
var params = querystring.parse(curUrl.query);
console.log('검색어 : ' + params.query)