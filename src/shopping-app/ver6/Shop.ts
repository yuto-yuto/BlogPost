import * as readSync from "readline-sync";
import { CommandName } from "./Command";
import { CommandHolder } from "./CommandHolder";
import { ItemHolder, ItemName } from "./Item";
import { ShoppingCart } from "./ShoppingCart";

export class Shop {
    private shoppingCart = new ShoppingCart();
    private commandHolder = new CommandHolder();
    public run() {
        console.log("Welcome to special shop. This is what you can do.");
        this.commandHolder.getCommand(CommandName.Command).execute();

        while (true) {
            const commandString = readSync.question("Input command: ");
            const args = commandString.split(" ");
            this.executeCommand(args);
        }
    }

    private executeCommand(args: string[]) {
        switch (args[0]) {
            case CommandName.Command:
                this.commandHolder.getCommand(args[0]).execute();
                break;
            case CommandName.List:
                this.displayItemList();
                break;
            case CommandName.Add:
                this.addItemToCart(args[1], parseInt(args[2], 10));
                break;
            case CommandName.Remove:
                this.removeItemFromCart(args[1], parseInt(args[2], 10))
                break;
            case CommandName.Cart:
                this.showItemsInCart();
                break;
            case CommandName.Pay:
                this.pay(args[1]);
                break;
            case CommandName.Exit:
                console.log("Thank you for your shopping.")
                process.exit();
            default:
                console.error("Undefined command.");
        }
    }

    private displayItemList() {
        const itemList = ItemHolder.list
            .reduce((acc, cur) => acc + `${cur.name}, ${cur.price}\n`, "");
        console.log(itemList);
    }

    private addItemToCart(itemName: string, numberOfItems: number) {
        if (!(Object.values(ItemName) as string[]).includes(itemName)) {
            console.log(`${itemName} doesn't exist.`);
            return;
        }
        this.shoppingCart.addItem(itemName as ItemName, numberOfItems);
    }

    private removeItemFromCart(itemName: string, numberOfItems: number) {
        this.shoppingCart.removeItem(itemName as ItemName, numberOfItems);
    }

    private showItemsInCart() {
        const items = this.shoppingCart.getList()
            .reduce((acc, cur) => acc + `${cur.name}: ${cur.numberOfItems}\n`, "");

        const message = items
            + `\ntotal number: ${this.shoppingCart.totalItemNumber}`
            + `\ntotal price: ${this.shoppingCart.totalPrice}`;
        console.log(message);
    }

    private pay(amountOfMoney: string) {
        if (amountOfMoney.slice(-1) !== "0") {
            console.error("Ones place digit must not 0.");
            return;
        }
        const change = parseInt(amountOfMoney, 10) - this.shoppingCart.totalPrice;
        const coinList = new Map<string, number>([
            ["1000", 0],
            ["500", 0],
            ["100", 0],
            ["50", 0],
            ["10", 0],
        ]);
        calculateNumberOfCoins();
        showNumberOfCoins();
        console.log(`change: ${change}`);
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
                    console.log(`${key}: ${value}`);
                }
            });
        }
    }
}
