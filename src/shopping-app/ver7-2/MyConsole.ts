export interface MyConsole {
    log(...args: any[]): void;
    error(...args: any[]): void;
}

export class ShoppingConsole implements MyConsole {
    public log(...args: any[]): void {
        console.log(args);
    }
    public error(...args: any[]): void {
        console.error(args);
    }
}
