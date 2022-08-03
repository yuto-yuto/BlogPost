export { }

// Interface to define function args
interface MyInterface {
    name: string;
    age: number;
}
type MyType = {
    name: string;
    age: number;
}

function func(name: string, age: number) {
    return `I'm ${name}. I'm ${age} years old.`;
}
function func1_2(name: string, age: number, isAdmin = false, interests?: string[]) {
    let msg = `I'm ${name}. I'm ${age} years old.`;
    if (isAdmin) {
        msg += "I have admin right."
    }
    if (interests) {
        msg += `My interests are [${interests.join(", ")}]`;
    }
    return msg;
}
function func2(args: { name: string, age: number }) {
    return `I'm ${args.name}. I'm ${args.age} years old.`;
}
function funcWithInterface(args: MyInterface) {
    return `I'm ${args.name}. I'm ${args.age} years old.`;
}
function funcWithType(args: MyInterface) {
    return `I'm ${args.name}. I'm ${args.age} years old.`;
}

// I'm Yuto. I'm 35 years old.
console.log(func("Yuto", 35));
console.log(func1_2("Yuto", 35, true));
console.log(func1_2("Yuto", 35, false, ["Guitar", "Music"]));
console.log(funcWithInterface({ name: "Yuto", age: 35 }));
console.log(funcWithType({ name: "Yuto", age: 35 }));

const person = {
    name: "Yuto",
    age: 35,
    isAdmin: true,
    job: "Programmer",
};

console.log(funcWithInterface({
    age: 35,
    name: "Yuto",
}));

console.log(funcWithInterface(person));

function funcWithDefault(args: {
    prop1: string,
    prop2?: string,
    prop3?: string,
}) {
    const defaultValue = {
        prop2: "default2",
        prop3: "default2",
    }
    args = {
        ...defaultValue,
        ...args,
    };
    return args;
}
console.log(funcWithDefault({ prop1: "something" }));
console.log(funcWithDefault({ prop1: "something", prop2: "something2", prop3: "something3" }));

// ==================================

interface StringDecorator {
    decorate(str: string): string;
}

class AsteriskDecorator implements StringDecorator {
    public decorate(str: string): string {
        const lines = str.split("\n");
        const lineLength = Math.max(...lines.map((line) => line.length)) + 4;
        const linesWithAsterisk = lines.map((line) => "* " + line.padEnd(lineLength - 4, " ") + " *\n");

        return "*".repeat(lineLength) + "\n" +
            linesWithAsterisk.join("") +
            "*".repeat(lineLength);
    }
}

class TopBottomLineDecorator implements StringDecorator {
    public decorate(str: string): string {
        const lineLength = Math.max(...str.split("\n").map((line) => line.length)) + 4;
        return "-".repeat(lineLength) + "\n" +
            str + "\n" +
            "-".repeat(lineLength) + "\n";
    }
}

const str = "Hello.\nHow are you?\n";
{
    const instance = new AsteriskDecorator();
    console.log(instance.decorate(str));
}
{
    const instance = new TopBottomLineDecorator();
    console.log(instance.decorate(str));
}

enum DecorateType {
    Plain,
    Asterisk,
    TopBottomLine,
}
function decorate(str: string, type: DecorateType): string {
    if (type === DecorateType.Asterisk) {
        const lines = str.split("\n");
        const lineLength = Math.max(...lines.map((line) => line.length)) + 4;
        const linesWithAsterisk = lines.map((line) => "* " + line.padEnd(lineLength - 4, " ") + " *\n");

        return "*".repeat(lineLength) + "\n" +
            linesWithAsterisk.join("") +
            "*".repeat(lineLength);
    } else if (type === DecorateType.TopBottomLine) {
        const lineLength = Math.max(...str.split("\n").map((line) => line.length)) + 4;
        return "-".repeat(lineLength) + "\n" +
            str + "\n" +
            "-".repeat(lineLength) + "\n";
    }
    return str;
}

console.log("-----Asterisk-----");
console.log(decorate(str, DecorateType.Asterisk));
console.log("-----TopBottomLine-----");
console.log(decorate(str, DecorateType.TopBottomLine));
console.log("-----Plain-----");
console.log(decorate(str, DecorateType.Plain));