export class BaseClass {
    static staticProp = "static-prop";
    public static readonly readonlyStaticProp = "readonly-static-prop";
    public exposedProp = 1;
    public readonly readonlyProp = 99;

    protected proctedProp = "base-protected-prop";
    private privateCount = 0;

    constructor() {
        console.log("New BaseClass instance is created.");
    }

    callPublicFunc(): void {
        console.log("Calling private function.");
        const result = this.callPrivateFunc();
        console.log(result);
    }

    private callPrivateFunc(): string {
        this.privateCount++;
        return `proctedProp: ${this.proctedProp}, privateCount: ${this.privateCount}`;
    }
}
