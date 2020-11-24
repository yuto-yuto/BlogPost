const http = require("http");
const fs = require("fs");

const port = process.env.PORT || "80";

const server = http.createServer((req, res) => {
    res.writeHead(200);
    const message = "zZZ";
    console.log(message)
    res.end(message);
});
server.listen(parseInt(port, 10));
console.log(`Running on http://${require("os").hostname}:${port}`)
