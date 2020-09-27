export class SingletonHolder {
    private static _instance?: SecondSingleton;
    public static get instance(): SecondSingleton {
        if (!this._instance) {
            this._instance = new SecondSingleton();
        }
        return this._instance;
    }

    private constructor() { };
}

export class SecondSingleton {
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