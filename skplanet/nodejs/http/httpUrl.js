var http = require('http');
var fs = require('fs');
var _url = require('url');

var server = http.createServer(function (req, res) {
    var parsed = _url.parse(req.url)
    var query = parsed.query
    console.log(query)

    res.end('hi')

}).listen(3000)