import * as readSync from "readline-sync";

enum Command {
    List = "list",
    Add = "add",
    Remove = "remove",
    Cart = "cart",
    Pay = "pay",
    Command = "command",
    Exit = "exit",
}

enum Item {
    Apple = "apple",
    Water = "water",
    Coffee = "coffee",
}

enum Price {
    Apple = 110,
    Water = 90,
    Coffee = 150,
}

export class Shop {
    private shoppingCart = new Map<string, number>();
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

    private displayItemList() {
        let itemList = `${Item.Apple}, ${Price.Apple}\n`;
        itemList += `${Item.Water}, ${Price.Water}\n`;
        itemList += `${Item.Coffee}, ${Price.Coffee}\n`;
        console.log(itemList);
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
                this.addItemToCart(args[1], parseInt(args[2]));
                break;
            case Command.Remove:
                this.removeItemFromCart(args[1], parseInt(args[2]))
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

    private addItemToCart(itemName: string, numberOfItems: number) {
        if (itemName === Item.Apple) {
            const currentNumber = this.shoppingCart.get(Item.Apple) || 0;
            this.shoppingCart.set(Item.Apple, currentNumber + numberOfItems);
        } else if (itemName === Item.Water) {
            const currentNumber = this.shoppingCart.get(Item.Water) || 0;
            this.shoppingCart.set(Item.Water, currentNumber + numberOfItems);
        } else if (itemName === Item.Coffee) {
            const currentNumber = this.shoppingCart.get(Item.Coffee) || 0;
            this.shoppingCart.set(Item.Coffee, currentNumber + numberOfItems);
        } else {
            console.log(`${itemName} doesn't exist.`);
        }
    }

    private removeItemFromCart(itemName: string, numberOfItems: number) {
        const currentNumber = this.shoppingCart.get(itemName) || 0;
        const result = currentNumber - numberOfItems;
        if (result <= 0) {
            this.shoppingCart.delete(itemName);
        } else {
            this.shoppingCart.set(itemName, result);
        }
    }

    private showItemsInCart() {
        let cart = "";
        let totalNumber = 0;
        let totalPrice = 0;
        this.shoppingCart.forEach((value, key) => {
            cart += `${key}: ${value}\n`;
            totalNumber += value;
            if (key === Item.Apple) {
                totalPrice += Price.Apple * value;
            } else if (key === Item.Water) {
                totalPrice += Price.Water * value;
            } else if (key === Item.Coffee) {
                totalPrice += Price.Coffee * value;
            }
        });

        const message = cart + `\ntotal number: ${totalNumber}\n`
            + `total price: ${totalPrice}`;
        console.log(message);
    }

    private pay(amountOfMoney: string) {
        if (amountOfMoney.slice(-1) === "0") {
            let totalPrice = 0;
            this.shoppingCart.forEach((value, key) => {
                if (key === Item.Apple) {
                    totalPrice += Price.Apple * value;
                } else if (key === Item.Water) {
                    totalPrice += Price.Water * value;
                } else if (key === Item.Coffee) {
                    totalPrice += Price.Coffee * value;
                }
            });
            const change = parseInt(amountOfMoney) - totalPrice;
            const coinList = new Map<string, number>([
                ["1000", 0],
                ["500", 0],
                ["100", 0],
                ["50", 0],
                ["10", 0],
            ]);
            let rest = change;
            coinList.forEach((value, key) => {
                if (rest > 0) {
                    const numberOfCoins = Math.floor(rest / parseInt(key));
                    if (numberOfCoins > 0) {
                        rest = change % parseInt(key);
                        coinList.set(key, numberOfCoins);
                    }
                }
            });
            coinList.forEach((value, key) => {
                if (value > 0) {
                    console.log(`${key}: ${value}`);
                }
            });
            console.log(`change: ${change}`);
            this.shoppingCart.clear();
        } else {
            console.error("Ones place digit must not 0.");
        }
    }
}
