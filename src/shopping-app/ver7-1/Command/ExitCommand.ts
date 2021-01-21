import { StaticConsole } from "../StaticConsole";
import { Command } from "./Command-def";

export class ExitCommand implements Command {
    public execute(): void {
        StaticConsole.log("Thank you for your shopping.")
        process.exit();
    }
}