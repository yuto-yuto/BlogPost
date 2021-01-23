export interface MyConsole {
    log(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
}

export class ShoppingConsole implements MyConsole {
    public log(message?: any, ...optionalParams: any[]): void {
        console.log(message, ...optionalParams);
    }
    public error(message?: any, ...optionalParams: any[]): void {
        console.error(message, ...optionalParams);
    }
}
