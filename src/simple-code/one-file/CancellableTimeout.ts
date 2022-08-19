export { }

function doSomething(): void {
    console.log("Preparation step");
    global.setTimeout(() => {
        console.log("Do what you want here");
    }, 1000);
}
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => global.setTimeout(resolve, ms));
}

async function doSomething2(): Promise<void> {
    console.log("Preparation step");
    await sleep(1000);
    console.log("Do what you want here");
    await sleep(1000);
    console.log("Do something2");
}

function doSomething3(): Promise<void> {
    console.log("Preparation step");
    return sleep(1000)
        .then(() => {
            console.log("Do what you want here");
            return sleep(1000);
        })
        .then(() => {
            console.log("Do something2");
        })
}


interface CancellableSleep {
    promise: Promise<void>;
    cancel(reason?: any): void;
}

function cancellableSleep(ms: number): CancellableSleep {
    let timer: NodeJS.Timeout;
    let rejectPromise: (reason?: unknown) => void;

    const promise = new Promise<void>((resolve, reject) => {
        timer = global.setTimeout(() => resolve(), ms);
        rejectPromise = reject;
    });

    return {
        cancel: (reason?: unknown) => {
            global.clearTimeout(timer);
            rejectPromise(reason || new Error("Timeout cancelled"));
        },
        promise,
    };
}

class Connector {
    private timeout?: CancellableSleep;
    private count = 0;
    private readonly maxRetryCount = 3;

    public async connect(): Promise<void> {
        while (true) {
            try {
                // try to connect somethere
                console.log(`Connection attempt: ${this.count + 1}`);
                this.count++;

                if (this.count < this.maxRetryCount) {
                    throw new Error("Connection was not established.");
                }
                this.count = 0;
                return Promise.resolve();
            } catch (e) {
                if (e instanceof Error) {
                    console.error(e.message);
                }

                this.timeout = cancellableSleep(1000);
                await this.timeout.promise;
            }
        }
    }
    public stop() {
        this.timeout?.cancel("Connection is no longer needed.");
        this.timeout = undefined;
    }
}

const connector = new Connector();
// connector.connect().then(() => {
//     console.log("Connected");
// });

connector.connect()
    .then(() => {
        console.log("Connected");
    })
    .catch((reason) => {
        console.error(`Connection failure: ${reason}`)
    });
global.setTimeout(() => connector.stop(), 1500);

// const timer = global.setTimeout(() => {
//     console.log("timeout----");
// }, 1000)
// global.clearTimeout(timer);