import { ShoppingConsole } from "../MyConsole";
import { ShoppingCart } from "../ShoppingCart";
import { Command } from "./Command-def";

export class ShowItemsCommand implements Command {
    constructor(
        private shoppingCart: ShoppingCart,
        private shoppingConsole: ShoppingConsole,
    ) { }

    public execute(): void {
        const items = this.shoppingCart.getList()
            .reduce((acc, cur) => acc + `${cur.name}: ${cur.numberOfItems}\n`, "");

        const message = items
            + `\ntotal number: ${this.shoppingCart.totalItemNumber}`
            + `\ntotal price: ${this.shoppingCart.totalPrice}`;
        this.shoppingConsole.log(message);
    }
}
