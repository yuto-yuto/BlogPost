{
    let array = [
        { key: "key1", value: 11 },
        { key: "key2", value: 22 },
        { key: "key3", value: 33 },
        { key: "key4", value: 44, special: { value: true } },
        { key: "key5", value: 55 },
    ];

    {
        const find = (val: number) => array.find((x) => x.value === val);
        const result1 = find(22)
        console.log(result1!.key);

        const result2 = find(2233);
        console.log(result2?.key);
        // console.log(result2!.key); // TypeError: Cannot read property 'key' of undefined

        const result3 = find(33);
        console.log(result3?.key);

        const existSpecial = (value: number) => {
            const found = find(value);
            if (found?.special?.value === true) {
                console.log(`special object found.`);
            } else {
                console.log(`special object not found.`);
            }
        }
        existSpecial(22);
        existSpecial(44);
    }

    interface MyType {
        name: string;
        age: number;
        hobby?: string;
    }
    type AllPropsRequiredType = Required<MyType>;
    const myType1: MyType = { name: "yu", age: 34 };
    const myType2: MyType = { name: "yu", age: 34, hobby: "programming" };
    const myType3: AllPropsRequiredType = { name: "yu", age: 34, hobby: "programming" };
    // const myType4: AllPropsRequiredType = { name: "yu", age: 34 };
    // Property 'hobby' is missing in type '{ name: string; age: number; }' but required in type 'Required<MyType>'.ts(2741)

    type PartialType = Partial<MyType>;
    const partialType1: PartialType = {};

    type PickType = Pick<MyType, "name" | "hobby">;
    const pickType1: PickType = { name: "yu" };
    const pickType2: PickType = { name: "yu", hobby: "programming" };

    type OmitType = Omit<MyType, "hobby">;
    const omitType1: OmitType = { name: "yu", age: 34 };
    // const omitType2: OmitType = { name: "yu", age: 34, hobby: "error" };
    // Type '{ name: string; age: number; hobby: string; }' is not assignable to type 'OmitType'.
    // Object literal may only specify known properties, and 'hobby' does not exist in type 'OmitType'.ts(2322)

    type NullableDataType = number | string | null | undefined;
    const nullableData1: NullableDataType = null;
    const nullableData2: NullableDataType = undefined;
    const nullableData3: NullableDataType = "string";

    type NonNullableType = NonNullable<NullableDataType>;
    // const nonNullableData1: NonNullableType = null;
    // Type 'null' is not assignable to type 'NonNullableType'.ts(2322)
    // const nonNullableData2: NonNullableType = undefined;
    // Type 'undefined' is not assignable to type 'NonNullableType'.ts(2322)
    const nonNullableData3: NonNullableType = "string";
}

{
    interface Role {
        do(): void;
    }
    class Manager implements Role {
        do(): void {
            console.log("I make a plan.");
        }
    }
    class Developer implements Role {
        do(): void {
            console.log("I develop a software.");
        }
    }
    {
        function roleFactory(value: string): Role | undefined {
            switch (value) {
                case "manager": return new Manager();
                case "developer": return new Developer();
                default: return undefined;
            }
        }

        const roles = ["manager", "developer", "sales"];
        roles.forEach((role) => {
            const instance = roleFactory(role);
            if (instance) {
                instance.do();
            }
        });
    }
    {
        class UndefinedRole implements Role {
            do(): void { }
        }

        function roleFactory(value: string): Role {
            switch (value) {
                case "manager": return new Manager();
                case "developer": return new Developer();
                default: return new UndefinedRole();
            }
        }

        const roles = ["manager", "developer", "sales"];
        roles.forEach((role) => {
            const instance = roleFactory(role);
            instance.do();
        });
    }
}