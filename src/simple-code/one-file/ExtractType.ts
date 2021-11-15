export interface Person {
    name: string;
    age: number;
    lang: string;
    address: {
        postalCode: number;
        city: string;
        street: string;
    }
}
{
    type PickPerson = Pick<Person, "name" | "age" | "address">;
    const person: PickPerson = {
        name: "Yuto",
        age: 34,
        // Type '{ name: string; age: number; lang: string; }' is not assignable to type 'PickPerson'.
        // Object literal may only specify known properties, and 'lang' does not exist in type 'PickPerson'.
        // lang: "ja",
        address: {
            city: "hoge-city",
            postalCode: 12345,
            street: "super-street",
        },
    };
}

{
    // Type '"address.postalCode"' does not satisfy the constraint 'keyof Person'.ts(2344)
    // type PostalCodeType = Pick<Person, "address.postalCode">;

    type AddressType = Pick<Person, "address">;
    const address: AddressType = {
        address: {
            city: "hoge-city",
            postalCode: 12345,
            street: "super-street",
        },
    };
}

{
    type AddressType = Person["address"];
    const address: AddressType = {
        city: "hoge-city",
        postalCode: 12345,
        street: "super-street",
    };
    type PostalCodeType = Person["address"]["postalCode"];
    const postalCode: PostalCodeType = 123;
    // 'errorPostalCode' is declared but its value is never read.ts(6133)
    // Type 'string' is not assignable to type 'number'.ts(2322)
    // const errorPostalCode: PostalCodeType = "123";
}

export interface Department1 {
    name: string;
    members: {
        name: string;
        age: number;
    }[];
}

{
    type PickNestedPersons = Pick<Department1, "members">;
    const person: PickNestedPersons = {
        members: [{
            name: "Yuto",
            age: 34,
        }],
    };

    // Type '"members.name"' does not satisfy the constraint 'keyof Department1'.ts(2344)
    // type PickNestedPerson = Pick<Department1, "members.name">;
}

export interface Department2 {
    name: string;
    members: Person[];
}

{
    const person: Person = {
        name: "Yuto",
        age: 34,
        lang: "ja",
        address: {
            city: "hoge-city",
            postalCode: 12345,
            street: "super-street",
        }
    };
}

{
    type PickNestedPerson = Department1["members"][0];
    const person: PickNestedPerson = {
        name: "Yuto",
        age: 34,
    };
}


export interface Company1 {
    name: string;
    departments: {
        name: Department1["name"];
        members: Department1["members"];
    }[];
}

export interface Company2 {
    name: string;
    departments: Department2[];
}