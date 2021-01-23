import { ItemHolder } from "../Item";
import { ShoppingConsole } from "../MyConsole";
import { Command } from "./Command-def";

export class ListCommand implements Command {
    constructor(private shoppingConsole: ShoppingConsole) { }
    public execute(): void {
        const itemList = ItemHolder.list
            .reduce((acc, cur) => acc + `${cur.name}, ${cur.price}\n`, "");
        this.shoppingConsole.log(itemList);
    }
}
