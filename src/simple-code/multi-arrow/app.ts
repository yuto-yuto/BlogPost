{
    const arrow = () => { console.log("Arrow1") };
    arrow();
}
{
    const arrow = () => "Arrow2";
    const result = arrow();
    console.log(result);
}
{
    const arrow = () => { "Arrow2-2" };
    const result = arrow();
    console.log(`result - ${result}`);
}
{
    const arrow = () => { return "Arrow2-3" };
    const result = arrow();
    console.log(`result - ${result}`);
}
{
    const arrow = (x: number) => { console.log(`Arrow${x}`) };
    arrow(3);
}
{
    const arrow = (x: number) => (y: number) => {
        console.log(`Arrow${x}-${y}`)
    };
    const next = arrow(4);
    next(1);
}

{
    const arrow = (x: number) => {
        const next = (y: number) => {
            console.log(`Arrow${x}-${y}`)
        };
        next(1);
    }
    arrow(5);
}

{
    const arrow = (x: number) => {
        const next = (y: number) => {
            console.log(`Arrow${x}-${y}`)
        };
        return next;
    };
    const result = arrow(6);
    result(1);
}

{
    type Greeting = { timeout: number, name: string };
    const createTimeouts = (greetings: Greeting[]) => (message: string) => {
        const setTimer = (greeting: Greeting) => {
            setTimeout(() => {
                console.log(`${greeting.timeout} - ${message} ${greeting.name}`);
            }, greeting.timeout);
        }
        return greetings.map(value => setTimer(value));
    };
    const args: Greeting[] = [
        { timeout: 1000, name: "Foo" },
        { timeout: 3000, name: "Yuto" },
        { timeout: 5000, name: "Hoo" },
    ];
    const setMessageTimer = createTimeouts(args);
    setMessageTimer("Hello");
}

{
    const arrow =
        (x: number) => (y: number) =>
            (z: number) => (zz: number) => {
                console.log(`Arrow${x}-${y}-${z}-${zz}`)
            };
    arrow(7)(8)(9)(10);
}


// ----- additional
{
    class Foo {
        private foo = 55;
        public doSomething(): void {
            console.log(`In Foo: ${this?.foo}`);
        }
    }
    class MyCallback {
        private foo = 22;
        public do(callback: () => void) {
            console.log(`In MyCallback: ${this.foo}`);
            callback();
        }
    }
    const foo = new Foo();
    const myCallback = new MyCallback();
    myCallback.do(foo.doSomething);
    myCallback.do(() => { foo.doSomething() });
    myCallback.do(() => foo.doSomething());
}