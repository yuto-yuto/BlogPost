
function timeout1() {
    try {
        global.setTimeout(() => {
            console.log("internal process1 working...");
            throw new Error("throw an error1");
        }, 1000);
    } catch (e) {
        console.log(e.message);
    }
}
function timeout2() {
    global.setTimeout(() => {
        try {
            console.log("internal process2 working...");
            throw new Error("throw an error2");
        } catch (e) {
            console.error(e.message);
        }
    }, 1000);
}
function timeoutWithPromise1() {
    const promise = new Promise((_, reject) => {
        global.setTimeout(() => {
            console.log("internal process3 working...");
            throw new Error("throw an error3");
        }, 1000);
    });
    promise.catch((e) => {
        console.log(`error caught in promise.catch.`);
        console.log(e.message);
    });
}

function timeoutWithPromise2() {
    const promise = new Promise((_, reject) => {
        global.setTimeout(() => {
            try {
                console.log("internal process4 working...");
                throw new Error("throw an error4");
            } catch (e) {
                reject(e);
            }
        }, 1000);
    });
    promise.catch((e) => {
        console.log(`error caught in promise.catch.`);
        console.log(e.message);
    });
}

process.on("uncaughtException", (e) => {console.log(e.message) });
timeout1();
// timeout2();
// timeoutWithPromise1();
// timeoutWithPromise2();
