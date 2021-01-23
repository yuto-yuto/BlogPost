import * as readSync from "readline-sync";
import { CommandHolder } from "./CommandHolder";
import { ShoppingCart } from "./ShoppingCart";
import { CommandName } from "./Command/Command-def";
import { ShoppingConsole } from "./MyConsole";

export class Shop {
    private shoppingCart = new ShoppingCart();
    private commandHolder: CommandHolder;

    constructor(private shoppingConsole: ShoppingConsole) {
        this.commandHolder = new CommandHolder({
            shoppingCart: this.shoppingCart,
            shoppingConsole: this.shoppingConsole,
        });
    }

    public run() {
        this.shoppingConsole.log("Welcome to special shop. This is what you can do.");
        this.commandHolder.getCommand(CommandName.Command).execute();

        while (true) {
            const commandString = readSync.question("Input command: ");
            const args = commandString.split(" ");
            this.executeCommand(args);
        }
    }

    private executeCommand(args: string[]) {
        try {
            const commandArgs = args.slice(1);
            this.commandHolder.getCommand(args[0]).execute(commandArgs);
        } catch (e) {
            this.shoppingConsole.error(e);
        }
    }
}
