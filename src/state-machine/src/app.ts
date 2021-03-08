import { Context } from "./Context";
import { Key } from "./Key";
import { State } from "./State";

const interval = 30;

async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const last = "";
function log(value: unknown) {
    if (last !== value) {
        console.log(` -> ${value}`);
    }
}

async function run() {
    const context = new Context();

    async function update(state: State) {
        context.updateState(state);
        context.emit(log);
        await sleep(interval);
    }

    async function store(key: Key, value: number | boolean) {
        context.store(key, value);
        context.emit(log);
        await sleep(interval);
    }

    await update(State.Initial);
    await store(Key.Count1, 2);
    await store(Key.Count2, 2);
    await store(Key.Count3, 2);
    await store(Key.Flag, false);
}

run();