export class StaticConsole {
    public static log(...args: any[]): void {
        console.log(args);
    }
    public static error(...args: any[]): void {
        console.error(args);
    }
}