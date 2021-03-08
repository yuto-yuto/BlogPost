import { Context } from "./Context";
import { Key } from "./Key";
import { State } from "./State";

const interval = 30;

async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

let last = "";
function log(value: string) {
    if (last !== value) {
        last = value;
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

    //  *** Initial -> Running ***
    console.log(1);
    await update(State.Initial);
    await store(Key.Count1, 2); // not stored
    await store(Key.Count2, 2); // not stored
    await store(Key.Count3, 2); // not stored
    await store(Key.Flag, false); // not stored

    await update(State.Running);
    await store(Key.Count1, 2);
    await store(Key.Count2, 55); // not stored
    await store(Key.Count3, 44); // not stored
    await store(Key.Flag, false); // not stored

    // *** Running -> Ended -> Initial
    console.log(2);
    await update(State.Running);
    await update(State.Initial);
    await store(Key.Count1, 20); // not used
    await store(Key.Count2, 2);
    await store(Key.Count3, 0);
    await store(Key.Flag, false); // not used

    // *** Initial -> Running -> Aborted -> Initial
    console.log(3);
    await update(State.Initial);
    await update(State.Running);
    await store(Key.Count1, 20);
    await update(State.Initial);
    await store(Key.Count2, 2);
    await store(Key.Count3, 0);
    await store(Key.Flag, true); // not used
    
    // *** Initial -> Running -> Interrupted
    // -> Running -> Interrupted
    // -> Dummy Running -> Ended -> Initial
    console.log(4);
    await update(State.Initial);
    await update(State.Running);
    await store(Key.Count1, 20);
    await update(State.Interrupted);
    await update(State.Running);
    await store(Key.Count1, 28); // not stored
    await update(State.Interrupted);
    await update(State.Initial);
    await store(Key.Count2, 20);
    await store(Key.Flag, false);

    // *** Initial -> Running -> Interrupted
    // -> Aborted -> Initial
    console.log(5);
    await update(State.Initial);
    await update(State.Running);
    await store(Key.Count1, 20);
    await update(State.Interrupted);
    await update(State.Initial);
    await store(Key.Count2, 25);
    await store(Key.Flag, false);
}

run();
