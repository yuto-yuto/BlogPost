export abstract class ExecutorBase {
    constructor(protected _id: number) { }
    public execute(): void {
        console.log(`--- process start (ID: ${this.id}) ---`);
        this.run();
        console.log(`--- process end (ID: ${this.id}) ---`);
    }
    public get id(): number {
        return this._id;
    }
    protected abstract run(): void;
}

export class CommandExecutor extends ExecutorBase {
    constructor(id: number, private additional: string) {
        super(id);
    }
    protected run(): void {
        console.log(`***** Command executor (${this.additional}) *****`);
    }
}

export class ProcessExecutor extends ExecutorBase {
    protected run(): void {
        console.log(`***** Process running... *****`);
    }
    public putBug(): void {
        console.log("Put a bug.");
    }
}
