const http = require("http");
const interval = 5000;
const url = process.env.TEST_APP_URL

global.setInterval(() => {
    const req = http.request(url, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          console.log(`BODY: ${chunk}`);
        });
      });
    req.end();
}, interval);
