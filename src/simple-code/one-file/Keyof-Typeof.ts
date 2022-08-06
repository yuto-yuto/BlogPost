export { };

// keyof ==============
interface Book {
    name: string;
    authorName: string;
    price: number;
    publishedDate: Date;
}

// BookKey = "name" | "authorName" | "price" | "publishedDate"
type BookKey = keyof Book;

function sortBooks(books: Book[], key: BookKey) {

}

// typeof ==============

const person = {
    name: "Yuto",
    age: 35,
};

// {
//     name: string;
//     age: number;
// }
type PersonType = typeof person;
// const person1: typeof person = { name: "error", agge: 32 };
const person2: typeof person = { name: "OK", age: 32 };
// person2.age = "44";

// ------------
const LogLevelArray = [
    "Trace",
    "Debug",
    "Info",
    "Warn",
    "Error",
] as const;

// "Trace" | "Debug" | "Info" | "Warn" | "Error"
type LogType = typeof LogLevelArray[number];


// keyof typeof =========

enum LogLevel {
    Trace = "AA",
    Debug = "BB",
    Info = "CC",
    Warn = "DD",
    Error = "EE",
}

type LogLevelKey = keyof typeof LogLevel;
//  number | typeof Symbol.iterator | "toString" | "charAt" | "charCodeAt" | "concat" | "indexOf" | "lastIndexOf" | "localeCompare" | "match" | "replace" | "search" | "slice" | ... 34 more ... | "trimRight"
type LogLevelKey2 = keyof LogLevel;

const LogLevelObj = {
    Trace: 10,
    Debug: 20,
    Info: 30,
    Warn: 40,
    Error: 50,
} as const;

type LogTypeObjType = typeof LogLevelObj;
type LogTypeKey = keyof LogTypeObjType;
type LogTypeValue = typeof LogLevelObj[LogTypeKey];

// keyof typeof

const Yuto = {
    name: "Yuto",
    age: 35,
    greet: () => "Hi, I'm Yuto."
}

interface Person {
    name: string;
    age: number;
    greet(): string;
}


const book = {
    name: "Programming",
    price: 20,
};

