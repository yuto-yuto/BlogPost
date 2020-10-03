function requireCallback(callback: () => void): void {
    callback();
}
{
    console.log("start")
    requireCallback(async () => {
        const promise = new Promise((resolve) => {
            setTimeout(() => { console.log("in callback") }, 100);
        });
        await promise;
    });
    console.log("end")
}