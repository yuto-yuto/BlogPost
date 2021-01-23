import { ShoppingConsole } from "../MyConsole";
import { ShoppingCart } from "../ShoppingCart";
import { ArgsCommandBase } from "./ArgsCommandBase";
import { PayCommandArgs } from "./CommandArgs";

export class PayCommand extends ArgsCommandBase<PayCommandArgs> {
    constructor(
        private shoppingCart: ShoppingCart,
        private shoppingConsole: ShoppingConsole,
        ) {
        super();
    }
    protected process(args: PayCommandArgs): void {
        if (args.amountOfMoney.slice(-1) !== "0") {
            this.shoppingConsole.error("Ones place digit must not 0.");
            return;
        }
        const change = parseInt(args.amountOfMoney, 10) - this.shoppingCart.totalPrice;
        const coinList = new Map<string, number>([
            ["1000", 0],
            ["500", 0],
            ["100", 0],
            ["50", 0],
            ["10", 0],
        ]);
        calculateNumberOfCoins();
        showNumberOfCoins();
        this.shoppingConsole.log(`change: ${change}`);
        this.shoppingCart.clear();

        function calculateNumberOfCoins() {
            let rest = change;
            coinList.forEach((value, key) => {
                if (rest > 0) {
                    const numberOfCoins = Math.floor(rest / parseInt(key, 10));
                    if (numberOfCoins > 0) {
                        rest = rest % parseInt(key, 10);
                        coinList.set(key, numberOfCoins);
                    }
                }
            });
        }

        function showNumberOfCoins() {
            coinList.forEach((value, key) => {
                if (value > 0) {
                    this.shoppingConsole.log(`${key}: ${value}`);
                }
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
