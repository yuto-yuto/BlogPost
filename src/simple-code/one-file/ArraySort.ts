export { };

{
    // const nums = [5, 3, 4, 1, 2, 7, 3];
    const nums = [27, 24, 100, 1, 2];
    console.log(nums.sort().join(",")); // ASC
    console.log(nums.sort((a, b) => a - b).join(","));  // ASC
    console.log(nums.sort((a, b) => b - a).join(","));  // DESC
    console.log(nums.sort((a, b) => 0).join(","));  // Not sort
}

function ascending(a: string, b: string) {
    if (a > b) {
        return 1;
    }
    if (a < b) {
        return -1;
    }
    return 0;
}

function descending(a: string, b: string) {
    if (a < b) {
        return 1;
    }
    if (a > b) {
        return -1;
    }
    return 0;
}

const strs = [
    "AAA",
    "A",
    "AB",
    "ACC",
    "aaa",
    "aaaa",
    "a",
    "ab",
    "acc",
];
console.log(strs.sort().join(",")); // ASC
console.log(strs.sort(ascending).join(",")); // ASC
console.log(strs.sort(descending).join(",")); // DESC

function ascendingCaseIgnore(a: string, b: string) {
    const strA = a.toLowerCase();
    const strB = b.toLowerCase();
    if (strA > strB) {
        return 1;
    }
    if (strA < strB) {
        return -1;
    }
    return 0;
}

console.log(strs.sort(ascendingCaseIgnore).join(",")); // ASC

const strNums = ["27", "24", "100", "1", "002"];
console.log(strNums.sort().join(","));  // 002,1,100,24,27
console.log(strNums.sort((a, b) => {
    const numA = parseInt(a, 10);
    const numB = parseInt(b, 10);
    if (numA > numB) {
        return 1;
    }
    if (numA < numB) {
        return -1;
    }
    return 0;
}).join(","));  // 1,002,24,27,100

console.log(strNums.sort((a, b) => {
    const isLeadingZeroA = a.startsWith("0");
    const isLeadingZeroB = b.startsWith("0");
    if (isLeadingZeroA || isLeadingZeroB) {
        if (a > b) {
            return 1;
        }

        if (a < b) {
            return -1;
        }
        return 0;
    }

    const numA = parseInt(a, 10);
    const numB = parseInt(b, 10);
    if (numA > numB) {
        return 1;
    }
    if (numA < numB) {
        return -1;
    }
    return 0;
}).join(","));  // 002,1,24,27,100

function sortStringFirst(a: string, b: string) {
    const regex = /[-+]??\d+/;
    const isNumA = regex.test(a);
    const isNumB = regex.test(b);

    if (isNumA && !isNumB) {
        return 1;
    }
    if (!isNumA && isNumB) {
        return -1;
    }
    if (isNumA && isNumB) {
        const numA = parseInt(a, 10);
        const numB = parseInt(b, 10);
        if (numA > numB) {
            return 1;
        }
        if (numA < numB) {
            return -1;
        }
        return 0;
    }
    return null;
}
function sortNumberFirst(a: string, b: string) {
    const regex = /^[-+]??\d+$/;
    const isNumA = regex.test(a);
    const isNumB = regex.test(b);

    if (isNumA && !isNumB) {
        return -1;
    }
    if (!isNumA && isNumB) {
        return 1;
    }
    if (isNumA && isNumB) {
        const numA = parseInt(a, 10);
        const numB = parseInt(b, 10);
        if (numA > numB) {
            return 1;
        }
        if (numA < numB) {
            return -1;
        }
        return 0;
    }
    return null;
}

const strNumsMixed = ["27", "0xff", "100", "1", "002", "CCC", "AA", "aB"];
console.log(strNumsMixed.sort().join(",")); // 002,0xff,1,100,27,AA,CCC,aB
console.log(strNumsMixed.sort((a, b) => {
    const result = sortStringFirst(a, b);
    if (result === null) {
        return ascending(a, b);
    }
    return result;
}).join(","));  // AA,CCC,aB,0xff,1,002,27,100

console.log(strNumsMixed.sort((a, b) => {
    const result = sortNumberFirst(a, b);
    if (result === null) {
        return ascending(a, b);
    }
    return result;
}).join(","));  // 1,002,27,100,0xff,AA,CCC,aB

const extra = [
    "A1", "1", "A10", "A11", "A12", "5", "3", "10", "A2",
    "AB2", "A3", "A4", "B10", "B2", "F1", "F12", "F3",
];
console.log(extra.sort((a, b) => {
    const numeric = /^[-+]??\d+/;

    const isNumericA = numeric.test(a);
    const isNumericB = numeric.test(b);
    if (isNumericA && isNumericB) {
        // console.log(`A: ${a}, B: ${b}`)
        return parseInt(a, 10) - parseInt(b, 10);
    }

    if (isNumericA && !isNumericB) {
        return -1;
    }
    if (!isNumericA && isNumericB) {
        return 1;
    }

    const alphabets = /^[a-zA-Z]+/;
    // Alphabet + number: A1, B3...
    const aAlphabets = a.replace(/\d+/g, "");
    const bAlphabets = b.replace(/\d+/g, "");
    if (aAlphabets === bAlphabets) {
        // Compare AB10 and AB12 for example
        const aNumber = a.replace(alphabets, "");
        const bNumber = b.replace(alphabets, "");
        const result = aNumber === bNumber ? 0 : parseInt(aNumber, 10) - parseInt(bNumber, 10);
        console.log(`A: ${a}, B: ${b}, result: ${result}`)
        return result;
    }
    return aAlphabets > bAlphabets ? 1 : -1;
}).join(","));
