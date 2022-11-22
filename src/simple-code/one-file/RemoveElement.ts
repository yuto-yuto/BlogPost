export { }

console.log("---- pop ----");
{
    const array = [5, 4, 3, 2, 1, 0, 9];
    console.log(array.pop()) // 9
    console.log(array) // [ 5, 4, 3, 2, 1, 0 ]
}
{
    const array = ["aa", "bb", "cc"];
    console.log(array.pop()) // cc
    console.log(array) // ["aa", "bb"]
}

console.log("---- shift ----");
{
    const array = [5, 4, 3, 2, 1, 0, 9];
    console.log(array.shift()) // 5
    console.log(array) // [ 4, 3, 2, 1, 0, 9 ]

}
{
    const array = ["aa", "bb", "cc"];
    console.log(array.shift()) // aa
    console.log(array) // [ 'bb', 'cc' ]
}

console.log("---- indexOf ----");
{
    const array = [5, 2, 1, 0, 2];
    const index = array.indexOf(2);
    console.log(index) // 1
    array.splice(index, 1);
    console.log(array) // [ 5, 1, 0, 2 ]
}
{
    const array = ["aa", "bb", "cc"];
    const index = array.indexOf("bb");
    console.log(index); // 1
    array.splice(index, 1);
    console.log(array) // [ 'aa', 'cc' ]
}
console.log("---- indexOf loop ----");
{
    const array = [5, 2, 1, 0, 2];
    for (let i = 0; ; i++) {
        const index = array.indexOf(2);
        console.log(`${i}: ${index}`)
        // 0: 1
        // 1: 3
        // 2: -1
        if (index < 0) {
            break;
        }
        array.splice(index, 1);
    }
    console.log(array)
    // [ 5, 1, 0 ]
}
{
    const array = ["aa", "bb", "cc", "bb"];
    for (let i = 0; ; i++) {
        const index = array.indexOf("bb");
        console.log(`${i}: ${index}`)
        // 0: 1
        // 1: 2
        // 2: -1
        if (index < 0) {
            break;
        }
        array.splice(index, 1);
    }
    console.log(array)
    // [ 'aa', 'cc' ]
}
console.log("---- for loop ----");
{
    const array = [2, 2, 1, 0, 2];
    for (let i = array.length - 1; i >= 0; i--) {
        if (array[i] === 2) {
            console.log(i)
            // 4
            // 1
            // 0
            array.splice(i, 1);
        }
    }
    console.log(array)
    // [ 1, 0 ]
}
{
    const array = ["aa", "bb", "cc", "bb"];
    for (let i = array.length - 1; i >= 0; i--) {
        if (array[i] === "bb") {
            console.log(i)
            // 3
            // 1
            array.splice(i, 1);
        }
    }
    console.log(array)
    // [ 'aa', 'cc' ]
}
console.log("---- NG for loop ----");
{
    const array = [2, 2, 1, 0, 2];
    for (let i = 0; i < array.length; i++) {
        if (array[i] === 2) {
            console.log(i)
            // 0
            // 3
            array.splice(i, 1);
        }
    }
    console.log(array)
    // [ 2, 1, 0 ]  
}

console.log("==== object array ====")
console.log("---- indexOf ----")
{
    const obj = { prop1: 4, prop2: "d" };
    const array = [
        { prop1: 1, prop2: "a" },
        { prop1: 2, prop2: "b" },
        { prop1: 3, prop2: "c" },
    ];
    array.push(obj);
    const notFound = array.indexOf({ prop1: 1, prop2: "a" });
    console.log(notFound);  // -1
    const index = array.indexOf(obj);
    console.log(index); // 3
    array.splice(index, 1);
    console.log(array);
    // [
    //     { prop1: 1, prop2: 'a' },
    //     { prop1: 2, prop2: 'b' },
    //     { prop1: 3, prop2: 'c' }
    // ]
}

console.log("---- findIndex ----")
{
    const array = [
        { prop1: 1, prop2: "a" },
        { prop1: 2, prop2: "b" },
        { prop1: 3, prop2: "c" },
        { prop1: 4, prop2: "d" }
    ];
    const index = array.findIndex((value) => value.prop1 === 3 && value.prop2 === "c");
    console.log(index); // 2
    array.splice(index, 1);
    console.log(array);
    // [
    //     { prop1: 1, prop2: 'a' },
    //     { prop1: 2, prop2: 'b' },
    //     { prop1: 4, prop2: 'd' }
    // ]
}

console.log("---- for loop ----")
{
    const array = [
        { prop1: 1, prop2: "a" },
        { prop1: 2, prop2: "b" },
        { prop1: 3, prop2: "c" },
        { prop1: 4, prop2: "d" },
        { prop1: 2, prop2: "bb" },
    ];
    for (let i = array.length - 1; i >= 0; i--) {
        if (array[i].prop1 === 2) {
            console.log(i)
            // 4
            // 1
            array.splice(i, 1);
        }
    }
    console.log(array);
    // [
    //   { prop1: 1, prop2: 'a' },
    //   { prop1: 3, prop2: 'c' },
    //   { prop1: 4, prop2: 'd' }
    // ]
}

declare global {
    interface Array<T> {
        removeByPerfectMatch(value: T): void;
        removeByLooseMatch(predicate: (value: T, index: number, obj: T[]) => unknown): void;
        removeAllByPerfectMatch(value: T): void;
        removeAllByLooseMatch(predicate: (value: T, index: number, obj: T[]) => unknown): void;
    }
}

Array.prototype.removeByPerfectMatch = function (value) {
    const index = this.indexOf(value);
    if (index >= 0) {
        this.splice(index, 1);
    }
}

Array.prototype.removeByLooseMatch = function (predicate) {
    const index = this.findIndex(predicate);
    if (index >= 0) {
        this.splice(index, 1);
    }
}

Array.prototype.removeAllByPerfectMatch = function (value) {
    for (let i = this.length - 1; i >= 0; i--) {
        if (this[i] === value) {
            this.splice(i, 1);
        }
    }
}

Array.prototype.removeAllByLooseMatch = function (predicate) {
    for (let i = this.length - 1; i >= 0; i--) {
        if (predicate(this[i], i, this)) {
            this.splice(i, 1);
        }
    }
}

console.log("--- Generics ---")
{
    const obj = { prop1: 444, prop2: "ddd" };
    const array = [
        { prop1: 111, prop2: "aaa" },
        { prop1: 222, prop2: "bbb" },
        { prop1: 333, prop2: "ccc" },
        { prop1: 222, prop2: "bbb" },
        { prop1: 444, prop2: "ddd" },
        { prop1: 222, prop2: "bbb" },
    ];
    array.push(obj);
    array.push(obj);
    array.push(obj);

    let before = array.length;
    array.removeByPerfectMatch(obj);
    console.log(`length: ${before} -> ${array.length} (removeByPerfectMatch)`);
    console.log(array);

    before = array.length;
    array.removeByLooseMatch((value) => value.prop1 === 222)
    console.log(`length: ${before} -> ${array.length} (removeByLooseMatch)`);
    console.log(array);

    before = array.length;
    array.removeAllByLooseMatch((value) => value.prop1 === 222);
    console.log(`length: ${before} -> ${array.length} (removeAllByLooseMatch)`);
    console.log(array);

    before = array.length;
    array.removeAllByPerfectMatch({ prop1: 444, prop2: "ddd" });
    console.log(`length: ${before} -> ${array.length} (removeAllByPerfectMatch)`);
    console.log(array);

    before = array.length;
    array.removeAllByPerfectMatch(obj);
    console.log(`length: ${before} -> ${array.length} (removeAllByPerfectMatch)`);
    console.log(array);
}

function indexOfLoop(array: number[], deleteValue: number) {
    for (let i = 0; ; i++) {
        const index = array.indexOf(deleteValue);
        if (index < 0) {
            break;
        }
        array.splice(index, 1);
    }
}

function simpleLoop(array: number[], deleteValue: number) {
    for (let i = array.length - 1; i >= 0; i--) {
        if (array[i] === deleteValue) {
            array.splice(i, 1);
        }
    }
}

const count = 1000000;
const array = Array.from(Array(count).keys()).map(x => Math.floor(Math.random() * 100));
const array2 = [...array];

console.time("indexOfLoop");
indexOfLoop(array, 36);
console.timeEnd("indexOfLoop");

console.time("simpleLoop");
simpleLoop(array2, 36);
console.timeEnd("simpleLoop");