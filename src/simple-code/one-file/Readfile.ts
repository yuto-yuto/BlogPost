export { }

import * as fs from "fs";
import * as readline from "readline";

function read1(filePath: string): Promise<string[]> {
    return new Promise((resolve) => {
        const stream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input: stream,
            crlfDelay: Infinity
        });

        const result: string[] = [];
        rl.on("line", (line) => {
            result.push(line);
        });

        rl.on("close", () => {
            resolve(result);
        });
    });
}

async function read2(filePath: string): Promise<string[]> {
    const stream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: stream,
        crlfDelay: Infinity
    });

    const result: string[] = [];
    for await (const line of rl) {
        result.push(line);
    }

    return result;
}

async function read3(filePath: string): Promise<string[]> {
    const content = await fs.promises.readFile(filePath, { encoding: "utf8" });
    const lines = content.split("\r\n")

    const result: string[] = [];
    for (const line of lines) {
        result.push(line);
    }

    return result;
}

async function run() {
    const file = "D:/temp/data-read-only2.csv";
    for (; ;) {
        const result = await read3(file);
    }
}

run();