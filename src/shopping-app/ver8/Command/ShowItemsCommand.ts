import { ShoppingConsole } from "../MyConsole";
import { ShoppingCart } from "../ShoppingCart";
import { Command } from "./Command-def";

export class ShowItemsCommand implements Command {
    constructor(private args: {
        shoppingCart: ShoppingCart,
        shoppingConsole: ShoppingConsole,
    }) { }

    public execute(): void {
        const items = this.args.shoppingCart.getList()
            .reduce((acc, cur) => acc + `${cur.name}: ${cur.numberOfItems}\n`, "");

        const message = items
            + `\ntotal number: ${this.args.shoppingCart.totalItemNumber}`
            + `\ntotal price: ${this.args.shoppingCart.totalPrice}`;
        this.args.shoppingConsole.log(message);
    }
}
