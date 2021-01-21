import { ItemHolder } from "../Item";
import { Command } from "./Command-def";

export class ListCommand implements Command {
    public execute(): void {
        const itemList = ItemHolder.list
            .reduce((acc, cur) => acc + `${cur.name}, ${cur.price}\n`, "");
        console.log(itemList);
    }
}
