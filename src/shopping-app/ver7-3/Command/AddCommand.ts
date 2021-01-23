import { ItemName } from "../Item";
import { ShoppingConsole } from "../MyConsole";
import { ShoppingCart } from "../ShoppingCart";
import { ArgsCommandBase } from "./ArgsCommandBase";
import { AddCommandArgs } from "./CommandArgs";

export class AddCommand extends ArgsCommandBase<AddCommandArgs> {
    constructor(private args: {
        shoppingCart: ShoppingCart,
        shoppingConsole: ShoppingConsole,
    }) {
        super();
    }
    protected process(args: AddCommandArgs): void {
        if (!(Object.values(ItemName) as string[]).includes(args.itemName)) {
            this.args.shoppingConsole.log(`${args.itemName} doesn't exist.`);
            return;
        }
        this.args.shoppingCart.addItem(args.itemName as ItemName, args.numberOfItems);
    }
    protected convert(args: string[]): AddCommandArgs {
        if (args.length < 2) {
            throw new Error("Add command requires 2 arguments.");
        }
        return {
            itemName: args[0],
            numberOfItems: parseInt(args[1], 10),
        };
    }
}
