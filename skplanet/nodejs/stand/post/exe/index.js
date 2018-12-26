var http = require('http');
var htmlTemplate = require('./lib/template')
var querystring = require('querystring');
var moveList = [{ title: '트랜스포머', price: 1000 }];

http.createServer(function (req, res) {
    var url = req.url
    if (url === "/") {
        var list = '';
        for (var i = 0; i < moveList.length; i++) {
            list += '<li>' + moveList[i].title + ',' + moveList[i].price + '</li>'
        }
        res.setHeader("Content-Type", "text/html;charset=utf8")

        var t = htmlTemplate.init(`
            ${list}
            <form method="post" action="/receive">
                <input type="text" name="title">
                <input type="text" name="price">
                <input type="submit" value="upload">
            </form>`)

        res.write(t)
        res.end()
    } else if (url === "/receive") {
        var buffer = "";
        req.on('data', function (chunk) {
            buffer += chunk
            console.log('on이벤트의 청크값', chunk)
        })
        req.on('end', function () {

            var parsed = querystring.parse(buffer)
            moveList.push({ title: parsed.title, price: parsed.price })

            res.writeHead(301,
                { Location: '/' }
            );
            res.write('buffer : ', buffer)
            res.end()
        })
    }



}).listen(3000)