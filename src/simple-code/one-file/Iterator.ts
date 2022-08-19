export { };

const ONE_TWO_THREE = [
    "One",
    "Two",
    "Three",
] as const;

type StringNumType = typeof ONE_TWO_THREE[number];

const ANSWER: StringNumType[] = [
    ...ONE_TWO_THREE,
    ...ONE_TWO_THREE,
    ...ONE_TWO_THREE,
];

function getNext(): StringNumType {
    return ONE_TWO_THREE[Math.floor(Math.random() * ONE_TWO_THREE.length)];
}

function func(): void {
    let attemptCount = 0;
    let answerIndex = 0;
    const actualStringArray: StringNumType[] = [];

    console.log("Start")
    while (true) {
        attemptCount++;

        const currentString = getNext();
        if (ANSWER[answerIndex] !== currentString) {
            actualStringArray.splice(0, actualStringArray.length);
            answerIndex = 0;
            continue;
        }

        actualStringArray.push(currentString);
        answerIndex++;
        if (answerIndex === ANSWER.length) {
            break;
        }
    }
    console.log(`attemp count: ${attemptCount}`);
    console.log(`Answer: ${actualStringArray.join(",")}`);
}

function initializeIterator(): Iterator<StringNumType> {
    return ANSWER[Symbol.iterator]();
}

function func2(): void {
    let attemptCount = 0;
    const actualStringArray: StringNumType[] = [];

    let iterator = initializeIterator();

    console.log("Start")
    while (true) {
        attemptCount++;

        const nextAnswer = iterator.next();
        if (nextAnswer.done) {
            break;
        }

        const currentString = getNext();
        if (nextAnswer.value !== currentString) {
            iterator = initializeIterator();
            actualStringArray.splice(0, actualStringArray.length);
            continue;
        }

        actualStringArray.push(currentString);
    }
    console.log(`attemp count: ${attemptCount}`);
    console.log(`Answer: ${actualStringArray.join(",")}`);
}

// func2();

const array = ["11", "22", "33", "44"];
let iterator = array[Symbol.iterator]();
console.log(iterator.next());  // { value: '11', done: false }
console.log(iterator.next());  // { value: '22', done: false }
let iterator2 = iterator[Symbol.iterator]();
console.log(iterator2.next()); // { value: '33', done: false }
console.log(iterator2.next()); // { value: '44', done: false }
console.log(iterator.next());  // { value: undefined, done: true }

iterator = array[Symbol.iterator]();
console.log(iterator.next());  // { value: '11', done: false }

let iteratorResult = iterator.next();
while (!iteratorResult.done) {
    // do something with the value
    iteratorResult.value

    iteratorResult = iterator.next();
}
console.log("END")