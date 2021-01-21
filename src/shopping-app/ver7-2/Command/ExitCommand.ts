import { Command } from "./Command-def";

export class ExitCommand implements Command {
    public execute(): void {
        console.log("Thank you for your shopping.")
        process.exit();
    }
}