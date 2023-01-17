export { };

function sleep(): Promise<void> {
    return new Promise(resolve => global.setTimeout(resolve, 100));
}

const loopCount = 3;
async function run1() {
    console.time("Label1");
    for (let i = 0; i < loopCount; i++) {
        await sleep();
        console.timeLog("Label1");
    }
    console.timeEnd("Label1");

    for (let i = 0; i < loopCount; i++) {
        console.time("Label2");
        await sleep();
        // console.timeLog("Label2");
        // (node:1004) Warning: Label 'Label1' already exists for console.time()

        console.timeEnd("Label2");
    }
}

run1().then();