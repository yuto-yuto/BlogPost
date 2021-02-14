import { ManyArgs } from "./Abstract";
import { showDataWithTypeGuards } from "./TypeGuards";

const personData: unknown = {
    name: "yuto",
    age: 30,
};
const bookData: unknown = {
    title: "book-title",
    numberOfPages: 200,
}

console.log("---- Type Guard ----")
if ("name" in (personData as any)) {
    console.log((personData as any).name);
}

if (personData instanceof Object && "name" in personData) {
    // Property 'name' does not exist on type 'never'
    // console.log(personData.name);
}

// User Defined Type Guards
showDataWithTypeGuards(personData);
showDataWithTypeGuards(bookData);
showDataWithTypeGuards({ foo: "undefined type" });

console.log("---- Abstract ----")
const data = {
    args1: "str 1",
    args2: "str 2",
    args3: "str 3",
};
if (data instanceof ManyArgs) {
    console.log(`${data.arg1}, ${data.arg2}, ${data.arg3}`)
} else {
    console.log("instanceof doesn't work.")
}