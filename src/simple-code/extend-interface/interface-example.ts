// interface
interface Person {
    readonly name: string;
    readonly age: number;
    sayHello(): void;
}

type PersonType = {
    readonly name: string;
    readonly age: number;
    sayHello(): void;
}

class Yuto implements Person {
    public readonly name = "Yuto";
    public get age(): number {
        return 34;
    };
    public sayHello(): void {
        console.log(`Hi, I'm ${this.name}.`);
    }
    public sayGoodMorning(): void {
        console.log(`Good morning.`);
    }
}

function introduce(person: Person): void {
    console.log(`I'm ${person.name}. I'm ${person.age} years old.`);
    person.sayHello();
}

const yuto: Person = new Yuto();
console.log(`name: ${yuto.name}, age: ${yuto.age}`);
yuto.sayHello();
// yuto.sayGoodMorning();

const john = { name: "John", age: 40, sayHello: () => console.log("I'm John.") };
introduce(yuto);
introduce(john);
