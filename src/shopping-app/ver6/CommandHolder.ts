import { Command, CommandName } from "./Command/Command-def";
import { ListCommand } from "./Command/ListCommand";
import { DisplayCommand } from "./Command/DisplayCommand";
import { AddCommand } from "./Command/AddCommand";
import { ShoppingCart } from "./ShoppingCart";

export class CommandHolder {
    private commands: Map<CommandName, Command>;
    constructor(shoppingCart: ShoppingCart) {
        this.commands = new Map();
        this.commands.set(CommandName.Command, new DisplayCommand());
        this.commands.set(CommandName.List, new ListCommand());
        this.commands.set(CommandName.Add, new AddCommand(shoppingCart));
    }
    public getCommand(name: CommandName): Command {
        const result = this.commands.get(name);
        if (!result) {
            throw new Error(`Specified command is undefined. [${name}]`);
        }
        return result;
    };
}