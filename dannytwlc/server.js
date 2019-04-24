const http = require('http');

http.createServer((req, res) => {
    if (req.url === "/") {
        res.write('hi')
        res.end();
    }
}).listen(3000)