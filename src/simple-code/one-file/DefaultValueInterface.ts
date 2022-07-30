export { }

interface MyInterface {
    a: number;
    b: string;
    c: unknown;
}

const MyInterfaceDefault: MyInterface = {
    a: 0,
    b: "default-string",
    c: null,
};
{
    const data1: MyInterface = {
        a: 0,
        b: "default-string",
        c: "something",
    };
    const data2: MyInterface = {
        a: 0,
        b: "default-string",
        c: { value: 1 },
    };
}
{
    const data1: MyInterface = {
        ...MyInterfaceDefault,
        c: "something",
    };
    const data2: MyInterface = {
        ...MyInterfaceDefault,
        c: { value: 1 },
    };
    console.log(data1);
    console.log(data2);
}
const data1: MyInterface = {
    ...MyInterfaceDefault,
    b: "How are you?",
}

function createMyInterface(options?: Partial<MyInterface>): MyInterface {
    const defaultValue: MyInterface = {
        a: 0,
        b: "default-string",
        c: null,
    };
    return {
        ...defaultValue,
        ...options,
    }
}
{
    console.log(createMyInterface());
    console.log(createMyInterface({ a: 999, c: "set-my-string" }));
}

class MyClass implements MyInterface {
    public a: number = 22;
    public b: string = "I'm good";
    public c: unknown = { value: 55 };
}

class MyInterfaceBase implements MyInterface {
    public a: number = 22;
    public b: string = "I'm good";
    public c: unknown = { value: 55 };
}
{
    const instance = new MyInterfaceBase();
    console.log(instance.a);
    console.log(instance.b);
    console.log(instance.c);
}

class ExtendedMyClass extends MyInterfaceBase { }
class ExtendedMyClass2 extends MyInterfaceBase {
    public d: number = 1234567890;
}
{
    const instance = new ExtendedMyClass();
    const instance2 = new ExtendedMyClass2();
    console.log(instance);
    console.log(instance2);
    // console.log(instance.a);
    // console.log(instance.b);
    // console.log(instance.c);
}