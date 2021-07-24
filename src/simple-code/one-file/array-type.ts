
{
    const array1: (string | number)[] = ["Foo", 20, "hoo", "foo"];
    const array2: [string, number] = ["Foo", 20];
    const array3: [name: string, age: number] = ["Foo", 20];
    const array4: [string, number][] = [
        ["Foo", 20],
        ["Hoo", 30],
        ["Koo", 40],
    ];
}
enum MyValue {
    Four = 4,
    Five = 5,
    Six = 6,
}

enum MyType {
    AAA = "type a",
    BBB = "type b",
    CCC = "type c",
}

const TypeValueMap = new Map([
    [MyType.AAA, MyValue.Four],
    [MyType.BBB, MyValue.Five],
    [MyType.CCC, MyValue.Six],
]);

{
    const expected = [
        [MyType.AAA, MyValue.Four],
        [MyType.BBB, MyValue.Five],
        [MyType.CCC, MyValue.Six],
    ];

    console.log("------- 1");
    expected.forEach((data) => {
        const result = data[1] === TypeValueMap.get(data[0] as MyType);
        console.log(`type: ${data[0]}, result: ${result}`);
    });

    console.log("------- 2");
    expected.forEach((data) => {
        const type = data[0];
        const value = data[1];
        const result = value === TypeValueMap.get(type as MyType);
        console.log(`type: ${type}, result: ${result}`);
    });

    console.log("------- 3");
    expected.forEach((data) => {
        const [type, value] = data;
        const result = value === TypeValueMap.get(type as MyType);
        console.log(`type: ${type}, result: ${result}`);
    });

    console.log("------- 4");
    expected.forEach(([type, value]) => {
        const result = value === TypeValueMap.get(type as MyType);
        console.log(`type: ${type}, result: ${result}`);
    });
}

{
    const expected: [MyType, MyValue][] = [
        [MyType.AAA, MyValue.Four],
        [MyType.BBB, MyValue.Five],
        [MyType.CCC, MyValue.Six],
    ];

    console.log("------- 5");
    expected.forEach(([type, value]: [MyType, MyValue]) => {
        const result = value === TypeValueMap.get(type);
        console.log(`type: ${type}, result: ${result}`);
    });
}

{
    console.log("------- 6");
    type SpecialArray = [number, string, MyType, number, MyValue];
    function doSomething(array: SpecialArray) {
        const [
            id,
            name,
            type,
            sortOrder,
            value,
        ] = array;
        console.log(`id: ${id.toString().padStart(4, "0")}`);
        console.log(`name: ${name.trim()}`);
        console.log(`type: ${TypeValueMap.get(type)}`);
        console.log(`sortOrder: ${sortOrder}`);
        console.log(`is value 4?: ${MyValue.Four === value}`);
    }
    const array: SpecialArray = [32, " bee  ", MyType.BBB, 1, MyValue.Six];
    console.log(doSomething(array));
}

{
    console.log("------- 7");
    const array = [22, "hoge", 52];

    interface Command {
        func: (arg: unknown) => void;
    }
    class StringCommand implements Command {
        public func(arg: unknown): void {
            if (typeof arg !== "string") {
                throw new Error("arg is not string.");
            }
            console.log(arg.trim());
        }
    }
    class NumberCommand implements Command {
        public func(arg: unknown): void {
            if (typeof arg !== "number") {
                throw new Error("arg is not number.");
            }
            console.log(arg * 2);
        }
    }
    function getCommand(arg: unknown): Command {
        const type = typeof arg;
        switch (type) {
            case "string": return new StringCommand();
            case "number": return new NumberCommand();
            default: throw new Error("Unsupported data type.");
        }
    };
    array.forEach((data) => {
        const instance = getCommand(data);
        instance.func(data);
    });
}

export { }
