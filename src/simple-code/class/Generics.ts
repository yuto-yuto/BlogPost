import { Person } from "./ClassWithInterface";

export class PersonHolder<T extends Person> {
    private map = new Map<string, T>();

    constructor() { }
    public push(key: string, person: T): void {
        this.map.set(key, person);
    }
    public get(key: string): T | undefined {
        return this.map.get(key);
    }
}

