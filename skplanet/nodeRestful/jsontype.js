const http = require('http');

const hostname = '127.0.0.1';
const port = process.env.port || 3000;
var users = [
    { name: 'Lee', age: 30 },
    { name: 'kim', age: 25 }
]


const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello2 World\n');
    } else if (req.url === "/users") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(users))
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});