import { ShoppingConsole } from "../MyConsole";
import { Command } from "./Command-def";

export class ExitCommand implements Command {
    constructor(private args: { shoppingConsole: ShoppingConsole }) { }
    public execute(): void {
        this.args.shoppingConsole.log("Thank you for your shopping.")
        process.exit();
    }
}