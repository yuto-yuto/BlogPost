import * as readSync from "readline-sync";
import { ItemName } from "./Item";
import { ShoppingCart } from "./ShoppingCart";

enum Command {
    List = "list",
    Add = "add",
    Remove = "remove",
    Cart = "cart",
    Pay = "pay",
    Command = "command",
    Exit = "exit",
}

enum Price {
    Apple = 110,
    Water = 90,
    Coffee = 150,
}

export class Shop {
    private shoppingCartClass = new ShoppingCart();
    public run() {
        console.log("Welcome to special shop. This is what you can do.");
        this.displayCommandList();

        while (true) {
            const commandString = readSync.question("Input command: ");
            const args = commandString.split(" ");
            this.executeCommand(args);
        }
    }

    private displayCommandList() {
        let commandList = `${Command.Command}: list the available commands\n`;
        commandList += `${Command.List}: show the item list and prices\n`;
        commandList += `${Command.Add}: add the item to shopping cart. Format is 'add <item name> <number>'\n`;
        commandList += `${Command.Remove}: remove the item from the shopping cart. Format is 'remove <item name> <number>'\n`;
        commandList += `${Command.Cart}: list items in shopping cart\n`;
        commandList += `${Command.Pay}: pay the cost and receive change. Format is 'pay <money>'\n`;
        console.log(commandList);
    }

    private executeCommand(args: string[]) {
        switch (args[0]) {
            case Command.Command:
                this.displayCommandList();
                break;
            case Command.List:
                this.displayItemList();
                break;
            case Command.Add:
                this.addItemToCart(args[1], parseInt(args[2], 10));
                break;
            case Command.Remove:
                this.removeItemFromCart(args[1], parseInt(args[2], 10))
                break;
            case Command.Cart:
                this.showItemsInCart();
                break;
            case Command.Pay:
                this.pay(args[1]);
                break;
            case Command.Exit:
                console.log("Thank you for your shopping.")
                process.exit();
            default:
                console.error("Undefined command.");
        }
    }

    private displayItemList() {
        let itemList = `${ItemName.Apple}, ${Price.Apple}\n`;
        itemList += `${ItemName.Water}, ${Price.Water}\n`;
        itemList += `${ItemName.Coffee}, ${Price.Coffee}\n`;
        console.log(itemList);
    }

    private addItemToCart(itemName: string, numberOfItems: number) {
        if (!(Object.values(ItemName) as string[]).includes(itemName)) {
            console.log(`${itemName} doesn't exist.`);
            return;
        }
        this.shoppingCartClass.addItem(itemName as ItemName, numberOfItems);
    }

    private removeItemFromCart(itemName: string, numberOfItems: number) {
        this.shoppingCartClass.removeItem(itemName as ItemName,numberOfItems);
    }

    private showItemsInCart() {
        const items = this.shoppingCartClass.getList()
            .reduce((acc, cur) => acc + `${cur.name}: ${cur.numberOfItems}\n`, "");

        const message = items
            + `\ntotal number: ${this.shoppingCartClass.totalItemNumber}`
            + `\ntotal price: ${this.shoppingCartClass.totalPrice}`;
        console.log(message);
    }

    private pay(amountOfMoney: string) {
        if (amountOfMoney.slice(-1) !== "0") {
            console.error("Ones place digit must not 0.");
            return;
        }
        const change = parseInt(amountOfMoney, 10) - this.shoppingCartClass.totalPrice;
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
        this.shoppingCartClass.clear();

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
