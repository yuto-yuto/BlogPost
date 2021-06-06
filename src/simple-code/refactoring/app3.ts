const scores = [88, 31, 95, 55, 63];

{
    let sum = 0;
    for (let i = 0; i < scores.length; i++) {
        sum += scores[i];
    }
    const average = sum / scores.length;
    console.log(`for: ${average}`);
}

{
    const sum = scores.reduce((acc: number, cur: number) => acc + cur);
    const average = sum / scores.length;
    console.log(`pipeline: ${average}`);
}

{
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = array
        .filter((x) => x % 2 === 0)
        .map((x) => x * x)
        .reduce((acc, cur) => acc + cur);
    console.log(`square sum: ${result}`);
}

{
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const evenNumber = array.filter((x) => x % 2 === 0);
    const evenSquares = evenNumber.map((x) => x * x);
    const sum = evenSquares.reduce((acc, cur) => acc + cur);
    console.log(`square sum: ${sum}`);
}