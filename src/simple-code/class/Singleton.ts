export class Singleton {
    private static instance?: Singleton;

    public static get getInstance(): Singleton {
        if (!this.instance) {
            this.instance = new Singleton();
        }
        return this.instance;
    }
    private constructor() { }

    private _count = 0;
    public get count(): number {
        this._count++;
        return this._count;
    }
}

export class Singleton2 {
    private static readonly instance: Singleton2 = new Singleton2();

    public static get getInstance(): Singleton2 {
        return this.instance;
    }
    private constructor() { }

    private _count = 0;
    public get count(): number {
        this._count++;
        return this._count;
    }
}
