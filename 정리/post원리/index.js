var http = require('http');
var htmlTemplate = require('./lib/template')
var querystring = require('querystring');
var urlR = require('url')


http.createServer(function (req, res) {
    var url = req.url
    if (url === "/") {


        var t = htmlTemplate.init(`
      
            <form method="post" action="/receive">
                <input type="text" name="title">
                <input type="text" name="dir">
                <input type="submit" value="upload">
            </form>`)
        res.setHeader("Content-Type", "text/html;charset=utf8")
        res.write(t)
        res.end()
    } else if (url === "/receive") {
        /* 청크들이 버퍼로 뭉친다., req.on('data',function(){})가 일어나는동안을 버퍼링이라고 한다. 최후에 post로 보낸 값이 생성된다 */
        var buffer = "";
        req.on('data', function (chunk) {
            buffer += chunk
            console.log('on이벤트의 청크값', chunk)
        })

        req.on('end', function () {
            console.log('마지막단계 버퍼값', buffer)
            res.setHeader("Content-Type", "text/html;charset=utf8")
            console.log('buffer :', buffer) // console 출력되나, 파서하기전이라 html에는 출력이 안된다.
            res.write('buffer : ', buffer) //파서하기전
            var parsed = querystring.parse(buffer)
            console.log('parsed : ', parsed)
            console.log('parsed.title : ', parsed.title)
            console.log('parsed.dir : ', parsed.dir)
            res.end()
        })



    }



}).listen(3000)