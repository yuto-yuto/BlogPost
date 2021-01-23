import { ShoppingConsole } from "../MyConsole";
import { Command } from "./Command-def";

export class UndefinedCommand implements Command {
    constructor(private shoppingConsole: ShoppingConsole) { }
    public execute(): void {
        this.shoppingConsole.error("Undefined command.");
    }
}