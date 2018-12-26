var url = require('url');
var urlStr = 'http://idols.com/hot/g?group=EXID&name=하니&since='
var parsed = url.parse(urlStr)
console.log(parsed)


console.log(parsed.protocol)
console.log(parsed.host)
console.log(parsed.query)


var parsed2 = url.parse(urlStr, true)
console.log(parsed2) //query가 분석되서 나온다.
console.log(parsed2.query) 
