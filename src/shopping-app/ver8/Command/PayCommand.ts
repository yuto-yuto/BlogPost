import { Casher } from "../Casher";
import { ShoppingConsole } from "../MyConsole";
import { ShoppingCart } from "../ShoppingCart";
import { ArgsCommandBase } from "./ArgsCommandBase";
import { PayCommandArgs } from "./CommandArgs";

export class PayCommand extends ArgsCommandBase<PayCommandArgs> {
    private casher = new Casher();
    constructor(private args: {
        shoppingCart: ShoppingCart,
        shoppingConsole: ShoppingConsole,
    }) {
        super();
    }
    protected process(args: PayCommandArgs): void {
        if (args.amountOfMoney.slice(-1) !== "0") {
            this.args.shoppingConsole.error("Ones place digit must not 0.");
            return;
        }
        const userPayment = parseInt(args.amountOfMoney, 10);
        const change = userPayment - this.args.shoppingCart.totalPrice;
        if (change < 0) {
            this.args.shoppingConsole.error(`You are ${Math.abs(change)} coin short.`);
            return;
        }
        const changeCoinList = this.casher.getChangeCoins(change);

        showNumberOfCoins(this.args.shoppingConsole);
        this.args.shoppingConsole.log(`change: ${change}`);
        this.args.shoppingCart.clear();

        function showNumberOfCoins(shoppingConsole: ShoppingConsole) {
            changeCoinList.forEach((value, key) => {
                shoppingConsole.log(`${key}: ${value}`);
            });
        }
    }

    protected convert(args: string[]): PayCommandArgs {
        if (args.length < 1) {
            throw new Error("Pay command requires 1 argument.");
        }
        return {
            amountOfMoney: args[0],
        };
    }
}
