import { Command } from "./Command-def";

export interface CommandArgs { }

export abstract class ArgsCommandBase<T extends CommandArgs> implements Command {
    public execute(args: string[]): void {
        const commandArgs = this.convert(args);
        this.process(commandArgs);
    }
    protected abstract process(args: T): void;
    protected abstract convert(args: string[]): T;
}