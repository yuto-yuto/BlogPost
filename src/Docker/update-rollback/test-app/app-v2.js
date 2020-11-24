const http = require("http");
const fs = require("fs");

const port = process.env.PORT || "80";

let count = 0;
let isHealthy = true;

const server = http.createServer((req, res) => {
    if (req.url === "/status") {
        res.writeHead(isHealthy ? 200 : 500);
        res.end(`state: ${isHealthy}`)
    } else if (req.url === "/exit") {
        res.writeHead(200);
        res.end("server will be unhealthy");
    }

    count++;
    res.writeHead(200);
    const message = `Hello, you called me ${count} times`;
    console.log(message)
    res.end(message);
});
server.listen(parseInt(port, 10));
console.log(`Running on http://${require("os").hostname}:${port}`)
