export class PrivateConstructor {
    public static create(name: string): PrivateConstructor {
        if (name.length === 0) {
            throw new Error("Empty string is not allowed.")
        }
        return new PrivateConstructor(name);
    }

    private constructor(private name: string) { }

    public sayHello(): void {
        console.log(`HELLO WORLD from ${this.name}`);
    }
}