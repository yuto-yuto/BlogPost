{
    console.log("--- while ---");
    const primeNumbers = [1, 2, 3, 5, 7];
    let count = 0;
    while (count < primeNumbers.length) {
        console.log(primeNumbers[count]);
        count++;
    }
}

{
    console.log("--- for ---");
    const primeNumbers = [1, 2, 3, 5, 7];
    for (let i = 0; i < primeNumbers.length; i++) {
        console.log(primeNumbers[i]);
    }
}

{
    console.log("--- for in ---");
    const primeNumbers = [1, 2, 3, 5, 7];
    for (const index in primeNumbers) {
        console.log(primeNumbers[index]);
    }
}

{
    console.log("--- for of ---");
    const primeNumbers = [1, 2, 3, 5, 7];
    for (const primeNumber of primeNumbers) {
        console.log(primeNumber);
    }
}

{
    console.log("--- forEach ---");
    [1, 2, 3, 5, 7]
        .forEach((primeNumber) => {
            console.log(primeNumber);
        });
}