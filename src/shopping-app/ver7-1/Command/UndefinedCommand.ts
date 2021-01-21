import { StaticConsole } from "../StaticConsole";
import { Command } from "./Command-def";

export class UndefinedCommand implements Command {
    public execute(): void {
        StaticConsole.error("Undefined command.");
    }
}