export { }

const personInformationWithAddress = {
    name: "Yuto",
    age: 34,
    address: {
        postalCode: 12345,
        city: "city",
        street: 99,
    },
};

console.log(personInformationWithAddress);
// {
//     name: 'Yuto',
//     age: 34,
//     address: { postalCode: 12345, city: 'city', street: 99 }
// }

{
    console.log(`name: ${personInformationWithAddress.name}`);          // name: Yuto
    console.log(`age: ${personInformationWithAddress.age}`);            // age: 34
    console.log(`city: ${personInformationWithAddress.address.city}`);  // city: city
}

{
    const person = personInformationWithAddress;
    console.log(`name: ${person.name}`);          // name: Yuto
    console.log(`age: ${person.age}`);            // age: 34
    console.log(`city: ${person.address.city}`);  // city: city
}

{
    const { name, age } = personInformationWithAddress;
    console.log(`name: ${name}`);   // name: Yuto
    console.log(`age: ${age}`);     // age: 34
}
{
    const { name: newName } = personInformationWithAddress;
    console.log(`newName: ${newName}`); // newName: Yuto      
}

{
    const { postalCode, city } = personInformationWithAddress.address;
    console.log(`address: ${postalCode}, ${city}`); // address: 12345, city
}

{
    const {
        name,
        address: {
            postalCode,
            city,
        }
    } = personInformationWithAddress;
    console.log(`name: ${name}`);   //name: Yuto
    console.log(`address: ${postalCode}, ${city}`); // address: 12345, city
}

{
    const {
        name,
        address: {
            postalCode: code,
            city: cityName,
        }
    } = personInformationWithAddress;
    console.log(`name: ${name}`);   //name: Yuto
    console.log(`address: ${code}, ${cityName}`); // address: 12345, city
}

{
    const personInfoArray = ["Yuto", 34, "city"];
    const [name, age, city] = personInfoArray;
    console.log(`name: ${name}`);   // name: Yuto
    console.log(`age: ${age}`);     // age: 34
    console.log(`city: ${city}`);   // city: city
}

const personInfoArray = [
    { name: "Yuto", age: 34 },
    { name: "Peter", age: 22 },
    { name: "Jack", age: 59 },
];
{
    const [yuto, peter, jack] = personInfoArray;
    console.log("Yuto => ", yuto.name, yuto.age);       // Yuto =>  Yuto 34
    console.log("Peter => ", peter.name, peter.age);    // Peter =>  Peter 22
    console.log("Jack => ", jack.name, jack.age);       // Jack =>  Jack 59

    personInfoArray.forEach((person) => console.log(`${person.name} =>`, person.name, person.age));
    // Yuto => Yuto 34
    // Peter => Peter 22
    // Jack => Jack 59
}
{
    const [yuto, ...others] = personInfoArray;
    console.log(yuto);      // { name: 'Yuto', age: 34 }
    console.log(others);    // [ { name: 'Peter', age: 22 }, { name: 'Jack', age: 59 } ]
}
{
    const [courseNumber, _1, _2, _3, numberOfPeople] = [1, 2, 3, 4, 5, 6, 7];
    console.log(courseNumber);      // 1
    console.log(numberOfPeople);    // 5
}