import { Command, CommandName } from "./Command/Command-def";
import { ListCommand } from "./Command/ListCommand";
import { DisplayCommand } from "./Command/DisplayCommand";
import { AddCommand } from "./Command/AddCommand";
import { ShoppingCart } from "./ShoppingCart";
import { RemoveCommand } from "./Command/RemoveCommand";
import { ShowItemsCommand } from "./Command/ShowItemsCommand";
import { PayCommand } from "./Command/PayCommand";
import { ExitCommand } from "./Command/ExitCommand";
import { UndefinedCommand } from "./Command/UndefinedCommand";

export class CommandHolder {
    private commands: Map<CommandName | string, Command>;
    constructor(shoppingCart: ShoppingCart) {
        this.commands = new Map();
        this.commands.set(CommandName.Command, new DisplayCommand());
        this.commands.set(CommandName.List, new ListCommand());
        this.commands.set(CommandName.Add, new AddCommand(shoppingCart));
        this.commands.set(CommandName.Remove, new RemoveCommand(shoppingCart));
        this.commands.set(CommandName.Cart, new ShowItemsCommand(shoppingCart));
        this.commands.set(CommandName.Pay, new PayCommand(shoppingCart));
        this.commands.set(CommandName.Exit, new ExitCommand());
    }
    public getCommand(name: CommandName | string): Command {
        const result = this.commands.get(name);
        if (!result) {
            return new UndefinedCommand();
        }
        return result;
    };
}