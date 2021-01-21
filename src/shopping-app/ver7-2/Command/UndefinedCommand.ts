import { Command } from "./Command-def";

export class UndefinedCommand implements Command {
    public execute(): void {
        console.error("Undefined command.");
    }
}