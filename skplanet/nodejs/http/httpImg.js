var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    fs.access('./test.png', function (err) {
        if (err) {
            console.log('이미지접근 err있음')
        }
        fs.readFile('./test.png', function (err, data) {
            if (err) {
                console.log('이미지 읽기 에러 있음')
            }
            console.log('성공적')

            res.writeHead(200, {
                'Content-Type': 'image/png'
            });
            res.end(data);
        })
    })

}).listen(3000)