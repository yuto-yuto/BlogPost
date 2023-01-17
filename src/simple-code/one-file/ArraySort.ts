export { };

{
    const nums = [5, 3, 4, 1, 2, 7, 3];
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

const strNums = ["1", "100", "27", "24", "CCC", "AA", "aB"]
console.log(strNums.sort().join(","))
