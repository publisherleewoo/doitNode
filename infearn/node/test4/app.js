const http = require('http');
const path = require('path');
var url = require("url");
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    var pathname = url.parse(req.url)
    console.log(pathname.pathname)
    console.log(pathname.path)
    if (pathname.path === "/a") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('test\n');
    }





    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});