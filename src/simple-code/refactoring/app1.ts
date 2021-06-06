function calc1() {
    let sumOfEven = 0;
    let sumOfOdd = 0;
    let oddSumInMultipleOfThree = 0;
    for (let i = 1; i <= 10; i++) {
        if (i % 2 === 0) {
            sumOfEven += i;
        } else {
            sumOfOdd += i;
            if (i % 3 === 0) {
                oddSumInMultipleOfThree += i;
            }
        }
    }
    console.log(`even sum: ${sumOfEven}`);
    console.log(`odd sum : ${sumOfOdd}`);
    console.log(`odd sum in multiple of three : ${oddSumInMultipleOfThree}`);
}

function calc2() {
    let sumOfEven = 0;
    for (let i = 1; i <= 10; i++) {
        if (i % 2 === 0) {
            sumOfEven += i;
        }
    }
    console.log(`even sum: ${sumOfEven}`);

    let sumOfOdd = 0;
    for (let i = 1; i <= 10; i++) {
        if (i % 2 !== 0) {
            sumOfOdd += i;
        }
    }
    console.log(`odd sum : ${sumOfOdd}`);

    let oddSumInMultipleOfThree = 0;
    for (let i = 1; i <= 10; i++) {
        if (i % 2 !== 0 && i % 3 === 0) {
            oddSumInMultipleOfThree += i;
        }
    }
    console.log(`odd sum in multiple of three : ${oddSumInMultipleOfThree}`);
}


function calc3() {
    const startLoop = (cb: (i: number) => void) => {
        for (let i = 1; i <= 10; i++) {
            cb(i);
        }
    }

    let sumOfEven = 0;
    startLoop((i) => {
        if (i % 2 === 0) {
            sumOfEven += i;
        }
    });
    console.log(`even sum: ${sumOfEven}`);

    let sumOfOdd = 0;
    startLoop((i) => {
        if (i % 2 !== 0) {
            sumOfOdd += i;
        }
    });
    console.log(`odd sum : ${sumOfOdd}`);

    let oddSumInMultipleOfThree = 0;
    startLoop((i) => {
        if (i % 2 !== 0 && i % 3 === 0) {
            oddSumInMultipleOfThree += i;
        }
    });
    console.log(`odd sum in multiple of three : ${oddSumInMultipleOfThree}`);
}

calc1();
calc2();
calc3();