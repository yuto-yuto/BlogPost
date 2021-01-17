import { Command, CommandArgs } from "./Command-def";

export abstract class ArgsCommandBase implements Command {
    public execute(args: string[]): void {
        const commandArgs = this.convert(args);
        this.process(commandArgs);
    }
    protected abstract process(args: CommandArgs): void;
    protected abstract convert(args: string[]): CommandArgs;
}