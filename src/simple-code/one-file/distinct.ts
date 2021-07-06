import isEqual from "lodash.isequal";
import { performance } from "perf_hooks";

const primitiveNumbers = [1, 2, 3, 2, 4, 5, 6, 3, 1];
const primitiveStrings = [
    "aaa", // duplicated 1
    "bbb",
    "ddd", // duplicated 2
    "aaa", // duplicated 1
    "eee",
    "ccc",
    "ddd",
];
const objects = [
    { name: "aaa", price: 50 },
    { name: "bbb", price: 30 }, // duplicated 1
    { name: "ccc", price: 80 }, // duplicated 2
    { name: "aaa", price: 15 },
    { name: "bbb", price: 30 }, // duplicated 1
    { name: "ccc", price: 80 }, // duplicated 2
];

function uniqBySetWithArrayFrom<T>(array: T[]): T[] {
    return Array.from(new Set(array));
}
function uniqBySetWithSpread<T>(array: T[]): T[] {
    return [...new Set(array)];
}

function uniqByFilter<T>(array: T[]): T[] {
    return array.filter((value, index) => array.indexOf(value) === index);
}

function uniqByMap<T>(array: T[]): T[] {
    const map = new Map();
    for (const item of array) {
        map.set(item, item);
    }
    return Array.from(map.values());
}

function uniqByForOf<T>(array: T[]): T[] {
    const result: T[] = [];
    for (const item of array) {
        if (!result.includes(item)) {
            result.push(item);
        }
    }
    return result;
}

function uniqByForEach<T>(array: T[]): T[] {
    const result: T[] = [];
    array.forEach((item) => {
        if (!result.includes(item)) {
            result.push(item);
        }
    })
    return result;
}

function uniqByReduce<T>(array: T[]): T[] {
    return array.reduce((acc: T[], cur: T) => {
        if (!acc.includes(cur)) {
            acc.push(cur);
        }
        return acc;
    }, [])
}

function uniqForObject<T>(array: T[]): T[] {
    const result: T[] = [];
    for (const item of array) {
        const found = result.some((value) => isEqual(value, item));
        if (!found) {
            result.push(item);
        }
    }
    return result;
}

function generatePrimitiveArray(length: number, range: number): number[] {
    const result = [];
    for (let i = 0; i < length; i++) {
        const value = Math.floor(Math.random() * range);
        result.push(value);
    }
    return result;
}

type UniqFunc<T> = (array: T[]) => T[];
function test<T>(array: T[], funcs: UniqFunc<T>[], loopCount = 1) {
    const times: number[] = [];
    for (const func of funcs) {
        const start = performance.now();
        for (let i = 0; i < loopCount; i++) {
            const result = func(array);
        }
        const elapsedTime = performance.now() - start;
        times.push(Math.round(elapsedTime));
        // console.log(`${func.name}, time: ${Math.round(elapsedTime)}`);
        // console.log(result);
    }
    return times;
}

const funcsForPrimitive = [
    uniqByForOf,
    uniqByForEach,
    uniqByReduce,
    uniqByFilter,
    uniqByMap,
    uniqBySetWithArrayFrom,
    uniqBySetWithSpread,
    uniqForObject,
];
test(primitiveNumbers, funcsForPrimitive);
test(primitiveStrings, funcsForPrimitive);
const funcsForObjects = [
    uniqForObject,
];
test(objects, funcsForObjects);

[
    { arrayLen: 10, loopRangeS: 100000, loopRangeE: 500000, step: 100000 },
    { arrayLen: 100, loopRangeS: 10000, loopRangeE: 500000, step: 5000 },
    { arrayLen: 1000, loopRangeS: 10000, loopRangeE: 50000, step: 5000 },
].forEach((settings) => {
    console.log(`length: ${settings.arrayLen}`);
    const array = generatePrimitiveArray(settings.arrayLen, 10);

    const titles = funcsForPrimitive.map(x => x.name).join(",");
    console.log(`loop count,${titles}`);
    for (let i = settings.loopRangeS; i <= settings.loopRangeE; i += settings.step) {
        const times = test(array, funcsForPrimitive, i);
        const data = times.join(", ");
        console.log(`${i}, ${data}`);
    }
    console.log();
});
