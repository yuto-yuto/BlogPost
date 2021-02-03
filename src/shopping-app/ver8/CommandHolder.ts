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
import { ShoppingConsole } from "./MyConsole";

export interface CommandRequiredArgs {
    shoppingCart: ShoppingCart;
    shoppingConsole: ShoppingConsole;
}

export class CommandHolder {
    private commands: Map<CommandName | string, Command>;
    private undefinedCommand: Command;
    constructor(args: CommandRequiredArgs) {
        this.commands = new Map();
        this.commands.set(CommandName.Command, new DisplayCommand(args));
        this.commands.set(CommandName.List, new ListCommand(args));
        this.commands.set(CommandName.Add, new AddCommand(args));
        this.commands.set(CommandName.Remove, new RemoveCommand(args));
        this.commands.set(CommandName.Cart, new ShowItemsCommand(args));
        this.commands.set(CommandName.Pay, new PayCommand(args));
        this.commands.set(CommandName.Exit, new ExitCommand(args));
        this.undefinedCommand = new UndefinedCommand(args);
    }
    public getCommand(name: CommandName | string): Command {
        const result = this.commands.get(name);
        if (!result) {
            return this.undefinedCommand;
        }
        return result;
    };
}