import * as http from "http";
import { URL } from "url";

export class Logger {
    private readonly logUrl = new URL("/log", process.env.LOGGER_API_URL);
    constructor(private name: string) { }

    public log(message: string) {
        const postData = JSON.stringify({
            name: this.name,
            data: message,
        });
        const options: http.RequestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData),
            }
        };

        const req = http.request(this.logUrl, options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
                console.log('No more data in response.');
            });
        });

        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
        });

        // Write data to request body
        req.write(postData);
        req.end();
    }
}

