var http = require('http');
var fs = require('fs');
var querystring = require('querystring')

var movieList = []


var server = http.createServer(function (req, res) {
    if (req.url === "/") {

        res.setHeader('Content-Type', 'text/html;charset=utf8')

        var list = '';
        for (var i = 0; i < movieList.length; i++) {
            list += `<li>${movieList[i].title},${movieList[i].dir}</li>`
        }

        res.write(`
            <!doctype html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="Generator" content="EditPlus��">
            <meta name="Author" content="">
            <meta name="Keywords" content="">
            <meta name="Description" content="">
            <title>Document</title>
            </head>

            <body>
            <ul>
            ${list}
            </ul>

            <form method="post" action="./receive">
            <input type="text" name="title">
            <input type="text" name="dir">
            <input type="submit" value="upload">
            </form>
            </body>

            </html>
        `)
        res.end()

    } else if (req.method === "POST") {
        var buffer = "";
        req.on('data', function (chunk) {
            console.log(buffer)
            buffer += chunk
        })
        req.on('end', function () {
            var data = querystring.parse(buffer)
            var title = data.title;
            var dir = data.dir;

            movieList.push({ title: title, dir: dir })
            res.statusCode = 302;
            console.log(movieList)
            res.setHeader('Location', '.');
            res.end();
        })
    }
}).listen(3000, '127.0.0.1')