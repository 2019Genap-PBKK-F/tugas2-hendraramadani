var http = require('http');

var server = http.createServer(function (req, res) {
    res.end("Hendra Ramadani");
});

server.listen(8010);

console.log("server running on http://localhost:8010");