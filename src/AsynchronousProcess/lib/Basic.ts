{
    const promise = new Promise((resolve) => {
        console.log("promise in")
        global.setTimeout(() => { resolve("Hey, dinner is ready."); }, 1000);
        console.log("promise out")
    });
    console.log("I start my homework.");
    promise.then((value) => {
        console.log(value); // "Hey, dinner is ready."
        console.log("Dinner was so nice.");
    });
    console.log("I finished my homework.");
}