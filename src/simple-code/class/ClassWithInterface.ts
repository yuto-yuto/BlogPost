export interface Person {
    name: string;
    introduce(): void;
}

export interface Engineer {
    develop(): void;
}

export class Yuto implements Person, Engineer {
    public readonly name = "Yuto";
    public introduce(): void {
        console.log("Hello, I'm Yuto.");
    }
    public develop(): void {
        console.log("implementing...");
    }
}

export class PersonClass implements Person {
    public get name(): string {
        return this._name;
    }
    constructor(private _name: string) { }
    public introduce(): void {
        console.log(`Hello, I'm ${this._name}.`);
    }
}
