import { CommandHolder } from "./CommandHolder";
import { ItemHolder } from "./Item";

export enum CommandName {
    List = "list",
    Add = "add",
    Remove = "remove",
    Cart = "cart",
    Pay = "pay",
    Command = "command",
    Exit = "exit",
}

export interface Command {
    execute(): void;
}

export class DisplayCommand implements Command {
    public execute(): void {
        const commandList = `${CommandName.Command}: list the available commands\n`
            + `${CommandName.List}: show the item list and prices\n`
            + `${CommandName.Add}: add the item to shopping cart. Format is 'add <item name> <number>'\n`
            + `${CommandName.Remove}: remove the item from the shopping cart. Format is 'remove <item name> <number>'\n`
            + `${CommandName.Cart}: list items in shopping cart\n`
            + `${CommandName.Pay}: pay the cost and receive change. Format is 'pay <money>'\n`;
        console.log(commandList);
    }
}

export class ListCommand implements Command {
    public execute(): void {
        const itemList = ItemHolder.list
            .reduce((acc, cur) => acc + `${cur.name}, ${cur.price}\n`, "");
        console.log(itemList);
    }
}