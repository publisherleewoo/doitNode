var http = require('http')

var server = http.createServer(function (req, res) {
    if (req.url = "/image.png") {
        res.writeHeader(200, { "Content-Type": "image/png" })
        false.read~~
    }

    else if (req.url = "/music.mp3") {
        res.writeHeader(200, { "Content-Type": "image/png" })
        fs.createReadStream
    } else if (req.url == "/movie.mp4") {
        fs.createReadStream
    }

})