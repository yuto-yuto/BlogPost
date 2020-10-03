{
    console.log("1");
    global.setImmediate(() => {
        console.log("2");
    });
    console.log("3");
}
