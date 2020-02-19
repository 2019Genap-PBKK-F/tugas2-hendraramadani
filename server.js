var http = require('http');

var server = http.createServer(function (req, res) {
    res.end("/404 Server Not found");
});

server.listen(6666);

console.log("server running on http://localhost:8000");