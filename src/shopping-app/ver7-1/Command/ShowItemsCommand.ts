import { ShoppingCart } from "../ShoppingCart";
import { StaticConsole } from "../StaticConsole";
import { Command } from "./Command-def";

export class ShowItemsCommand implements Command {
    constructor(private shoppingCart: ShoppingCart) { }
    public execute(): void {
        const items = this.shoppingCart.getList()
            .reduce((acc, cur) => acc + `${cur.name}: ${cur.numberOfItems}\n`, "");

        const message = items
            + `\ntotal number: ${this.shoppingCart.totalItemNumber}`
            + `\ntotal price: ${this.shoppingCart.totalPrice}`;
        StaticConsole.log(message);
    }
}
