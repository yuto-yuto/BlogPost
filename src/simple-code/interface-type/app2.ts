import { isPerson1, isPerson2 } from "./StrictTypeGuards";

export { };

const maybePerson: unknown = {
    name: "Yuto",
    age: 35,
};

// Object is of type 'unknown'
// maybePerson.name

if (isPerson1(maybePerson)) {
    // name/age can be used here
    console.log(`name: ${maybePerson.name}, age: ${maybePerson.age}`);
}

if (isPerson2(maybePerson)) {
    // name/age can be used here
    console.log(`name: ${maybePerson.name}, age: ${maybePerson.age}`);
}
