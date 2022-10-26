export { };

function findLowestUnusedNumber(numbers: number[]): number {
    for (let i = 0; i < numbers.length; i++) {
        if (i !== numbers[i]) {
            return i;
        }
    }
    return numbers.length;
}

console.log(findLowestUnusedNumber([0, 1, 2, 4, 5]));   // 3
console.log(findLowestUnusedNumber([0, 1, 2, 3, 4, 5]));// 6
console.log(findLowestUnusedNumber([0, 1, 1, 2, 4, 5]));// 2
console.log(findLowestUnusedNumber([0, 1, 2, 5]));      // 3
console.log(findLowestUnusedNumber([-3, -2, 0, 1, 2, 4, 5]));// 0
console.log(findLowestUnusedNumber([-1.5, -1.0, 0, 0.5]));     // 0
console.log(findLowestUnusedNumber([-1.5, -1.0, -0.5, 0, 0.5, 1.0]));// 0

function findLowestUnusedNumber1(numbers: number[]): number {
    const result = numbers.find((value, index) => value !== index);
    if (result) {
        return result - 1;
    }
    return numbers.length;
}
console.log("--- 1 ---");
console.log(findLowestUnusedNumber1([0, 1, 2, 4, 5]));   // 3
console.log(findLowestUnusedNumber1([0, 1, 2, 3, 4, 5]));// 6
console.log(findLowestUnusedNumber1([0, 1, 1, 2, 4, 5]));// 0
console.log(findLowestUnusedNumber1([0, 1, 2, 5]));      //  4
console.log(findLowestUnusedNumber1([-3, -2, 0, 1, 2, 4, 5]));// -4
console.log(findLowestUnusedNumber1([-1.5, -1.0, 0, 0.5]));     // -2.5
console.log(findLowestUnusedNumber1([-1.5, -1.0, -0.5, 0, 0.5, 1.0]));// -2.5

function findLowestUnusedNumber1_2(numbers: number[]): number {
    let foundIndex;
    const result = numbers.find((value, index) => {
        if (value !== index) {
            foundIndex = index;
            return true;
        }
        return false;
    });
    if (foundIndex) {
        return foundIndex;
    }
    return numbers.length;
}
console.log("--- 1_2 ---");
console.log(findLowestUnusedNumber1_2([0, 1, 2, 4, 5]));   // 3
console.log(findLowestUnusedNumber1_2([0, 1, 2, 3, 4, 5]));// 6
console.log(findLowestUnusedNumber1_2([0, 1, 1, 2, 4, 5]));// 2
console.log(findLowestUnusedNumber1_2([0, 1, 2, 5]));      // 3
console.log(findLowestUnusedNumber1_2([-3, -2, 0, 1, 2, 4, 5]));// 7
console.log(findLowestUnusedNumber1_2([-1.5, -1.0, 0, 0.5]));     // 4
console.log(findLowestUnusedNumber1_2([-1.5, -1.0, -0.5, 0, 0.5, 1.0]));// 6

function findLowestUnusedNumber2(numbers: number[]): number {
    const numberSet = new Set(numbers);

    let count = 0;
    for (const value of numberSet.values()) {
        if (count !== value) {
            return count;
        }
        count++;
    }
    return numberSet.size;
}

console.log("--- 2 ---");
console.log(findLowestUnusedNumber2([0, 1, 2, 4, 5]));          // 3
console.log(findLowestUnusedNumber2([0, 1, 2, 3, 4, 5]));       // 6
console.log(findLowestUnusedNumber2([0, 1, 1, 2, 2, 4, 5]));    // 3
console.log(findLowestUnusedNumber2([0, 1, 2, 5]));             // 3
console.log(findLowestUnusedNumber2([-3, -2, 0, 1, 2, 4, 5]));  // 0
console.log(findLowestUnusedNumber2([-1.5, -1.0, 0, 0.5]));     // 0
console.log(findLowestUnusedNumber2([-1.5, -1.0, -0.5, 0, 0.5, 1.0]));// 0

function findLowestUnusedNumber3(numbers: number[], step = 1): number {
    const numberSet = new Set(numbers);

    let currentExpected = numbers[0];
    for (const value of numberSet.values()) {
        if (currentExpected !== value) {
            return currentExpected;
        }
        currentExpected += step;
    }
    return numbers[numbers.length - 1] + step;
}

console.log("--- 3 ---");
console.log(findLowestUnusedNumber3([0, 1, 2, 4, 5]));          // 3
console.log(findLowestUnusedNumber3([0, 1, 2, 3, 4, 5]));       // 6
console.log(findLowestUnusedNumber3([0, 1, 1, 2, 2, 4, 5]));    // 3
console.log(findLowestUnusedNumber3([0, 1, 2, 5]));             // 3
console.log(findLowestUnusedNumber3([-3, -2, 0, 1, 2, 4, 5]));  // -1
console.log(findLowestUnusedNumber3([-1.5, -1.0, 0, 0.5], 0.5));// -0.5
console.log(findLowestUnusedNumber3([-1.5, -1.0, -0.5, 0, 0.5, 1.0], 0.5));// 1.5

console.log([5, 1, 2, 6, 3, 8, 9].sort())