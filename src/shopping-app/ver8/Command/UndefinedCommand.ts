import { ShoppingConsole } from "../MyConsole";
import { Command } from "./Command-def";

export class UndefinedCommand implements Command {
    constructor(private args: { shoppingConsole: ShoppingConsole }) { }
    public execute(): void {
        this.args.shoppingConsole.error("Undefined command.");
    }
}