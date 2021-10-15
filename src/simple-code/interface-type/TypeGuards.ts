import { Book, Person } from "./Interfaces";

export function isPerson(object: unknown): object is Person {
    return Object.prototype.hasOwnProperty.call(object, "name")
        && Object.prototype.hasOwnProperty.call(object, "age");
}
export function isBook(object: unknown): object is Book {
    return Object.prototype.hasOwnProperty.call(object, "title")
        && Object.prototype.hasOwnProperty.call(object, "numberOfPages");
}

export function showDataWithTypeGuards(data: unknown) {
    if (isPerson(data)) {
        console.log(`name: ${data.name}, age ${data.age}`);
    } else if (isBook(data)) {
        console.log(`title: ${data.title}, ` +
            `number of pages ${data.numberOfPages}`);
    } else {
        console.log("Undefined object type.");
    }
}

export function isErrnoException(object: unknown): object is NodeJS.ErrnoException {
    return Object.prototype.hasOwnProperty.call(object, "code")
        || Object.prototype.hasOwnProperty.call(object, "errno");
}