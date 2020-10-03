{
    console.log("Start")
    const promise = new Promise((resolve) => {
        global.setTimeout(() => resolve("resolved"), 100);
    });
    console.log("Define promise.then")
    promise.then((value) => {
        console.log(value);
    })

    console.log("Event loop starts")
    while (true) {
        // Event loop
    }
}