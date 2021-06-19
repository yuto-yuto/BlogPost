import { sleep } from "./sleep";

let lastTime: number | undefined;
let timeoutCound = 0;
async function recursiveSetTimeout(
    processMs: number,
    timeoutMs: number
): Promise<void> {
    await sleep(processMs);
    showIntervalTime();
    global.setTimeout(() => {
        recursiveSetTimeout(processMs, timeoutMs)
    }, timeoutMs);

    function showIntervalTime() {
        const now = Date.now();
        if (lastTime) {
            console.log(`setTimeout(${++timeoutCound}): ${now - lastTime}`);
        }
        lastTime = now;
    }
}

const processMs = 3000;
const intervalMs = 1000;
// recursiveSetTimeout(processMs, intervalMs);

let lastTime2: number | undefined;
let intervalCount = 0;
global.setInterval(async () => {
    await sleep(processMs)

    const now = Date.now();
    if (lastTime2) {
        console.log(`setInterval(${++intervalCount}): ${now - lastTime2}`);
    }
    lastTime2 = now;
}, intervalMs);
