import { ItemName } from "../Item";
import { ShoppingCart } from "../ShoppingCart";
import { ArgsCommandBase } from "./ArgsCommandBase";
import { RemoveCommandArgs } from "./CommandArgs";

export class RemoveCommand extends ArgsCommandBase<RemoveCommandArgs> {
    constructor(private args: { shoppingCart: ShoppingCart }) {
        super();
    }
    protected process(args: RemoveCommandArgs): void {
        this.args.shoppingCart.removeItem(args.itemName as ItemName, args.numberOfItems);
    }
    protected convert(args: string[]): RemoveCommandArgs {
        if (args.length < 2) {
            throw new Error("Remove command requires 2 arguments.");
        }
        return {
            itemName: args[0],
            numberOfItems: parseInt(args[1], 10),
        };
    }
}
