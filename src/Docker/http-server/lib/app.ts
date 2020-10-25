import * as http from "http";
import * as fs from "fs";

const host = "localhost";
const port = "80";

let count = 0;

const server = http.createServer((req, res) => {
    const data = (++count).toString();
    fs.writeFile("/data/text.txt", data, (error) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log("data has been saved");
    });
    res.writeHead(200);
    res.end('Hello, World!');
});
server.listen(port);
console.log(`Running on http://${host}:${port}`)