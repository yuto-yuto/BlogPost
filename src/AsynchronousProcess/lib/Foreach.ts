function doSlowProcess(a: number): Promise<number> {
    return new Promise((resolve) => {
        global.setTimeout(() => { resolve(a) }, 100);
    });
}
{
    let result = 0;
    [1, 2, 3, 4, 5].forEach(async (value) => {
        result = await doSlowProcess(value);
    });
    console.log(result);
}