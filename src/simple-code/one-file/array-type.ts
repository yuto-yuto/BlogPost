
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
    const array = [22, "hoge", 52];

    interface CommandArg {
        arg?: unknown;
    }
    interface Command {
        func: (arg: any) => void;
    }
    class MyCommand1 implements Command {
        public func(arg: string): void {
            // do something
        }
    }
    class MyCommand2 implements Command {
        public func(arg: number): void {
            // do something
        }
    }
    function func1(arg: string) { /* do something */ }
    function func2(arg: number) { /* do something */ }
    function getCommand(arg: unknown): Command {
        const type = typeof arg;
        switch (type) {
            case "string": return new MyCommand1();
            case "number": return new MyCommand2();
            default: throw new Error("Unsupported data type.");
        }
    };
    array.forEach((data) => {
        const instance = getCommand(data);
        instance.func(data);
    });
}

export { }
