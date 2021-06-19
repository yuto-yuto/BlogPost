import { sleep } from "./sleep";

{
    let lastTime: number | undefined;
    let count = 0;

    async function recursiveImmediate(processMs: number): Promise<void> {
        await sleep(processMs);
        const now = Date.now();
        if (lastTime) {
            console.log(`setImmediate(${++count}): ${now - lastTime}`);
        }
        lastTime = now;
        global.setImmediate(() => recursiveImmediate(processMs));
    }

    recursiveImmediate(3000);
}
