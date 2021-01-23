import { ShoppingConsole } from "../MyConsole";
import { Command } from "./Command-def";

export class ExitCommand implements Command {
    constructor(private shoppingConsole: ShoppingConsole) { }
    public execute(): void {
        this.shoppingConsole.log("Thank you for your shopping.")
        process.exit();
    }
}