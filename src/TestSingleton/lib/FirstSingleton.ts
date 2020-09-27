export class FirstSingleton {
    private static _instance?: FirstSingleton;
    public static get instance(): FirstSingleton {
        if (!this._instance) {
            this._instance = new FirstSingleton();
        }
        return this._instance;
    }

    private constructor() { };

    private callCount = 0;
    public greet(): string {
        this.callCount++;
        if (this.callCount === 1) {
            return "hello";
        } else if (this.callCount === 2) {
            return "how are you";
        }
        return "see you again";
    }
}