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
    public run() {
        console.log("Welcome to special shop. This is what you can do.");
        let commandList = `${Command.Command}: list the available commands\n`;
        commandList += `${Command.List}: show the item list and prices\n`;
        commandList += `${Command.Add}: add the item to shopping cart. Format is 'add <item name> <number>'\n`;
        commandList += `${Command.Remove}: remove the item from the shopping cart. Format is 'remove <item name> <number>'\n`;
        commandList += `${Command.Cart}: list items in shopping cart\n`;
        commandList += `${Command.Pay}: pay the cost and receive change. Format is 'pay <money>'\n`;
        console.log(commandList);

        const shoppingCart = new Map<string, number>();

        while (true) {
            const commandString = readSync.question("Input command: ");
            const args = commandString.split(" ");
            if (args[0] === Command.Command) {
                console.log(commandList);
            } else if (args[0] === Command.List) {
                let itemList = `${Item.Apple}, ${Price.Apple}\n`;
                itemList += `${Item.Water}, ${Price.Water}\n`;
                itemList += `${Item.Coffee}, ${Price.Coffee}\n`;
                console.log(itemList);
            } else if (args[0] === Command.Add) {
                if (args[1] === Item.Apple) {
                    const currentNumber = shoppingCart.get(Item.Apple) || 0;
                    const addedNumber = parseInt(args[2], 10);
                    shoppingCart.set(Item.Apple, currentNumber + addedNumber);
                } else if (args[1] === Item.Water) {
                    const currentNumber = shoppingCart.get(Item.Water) || 0;
                    const addedNumber = parseInt(args[2], 10);
                    shoppingCart.set(Item.Water, currentNumber + addedNumber);
                } else if (args[1] === Item.Coffee) {
                    const currentNumber = shoppingCart.get(Item.Coffee) || 0;
                    const addedNumber = parseInt(args[2], 10);
                    shoppingCart.set(Item.Coffee, currentNumber + addedNumber);
                } else {
                    console.log(`${args[1]} doesn't exist.`);
                }
            } else if (args[0] === Command.Remove) {
                const currentNumber = shoppingCart.get(args[1]) || 0;
                const removeNumber = parseInt(args[2], 10);
                const result = currentNumber - removeNumber;
                if (result <= 0) {
                    shoppingCart.delete(args[1]);
                } else {
                    shoppingCart.set(args[1], result);
                }
            } else if (args[0] === Command.Cart) {
                let cart = "";
                let totalNumber = 0;
                let totalPrice = 0;
                shoppingCart.forEach((value, key) => {
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
            } else if (args[0] === Command.Pay) {
                if (args[1].slice(-1) === "0") {
                    let totalPrice = 0;
                    shoppingCart.forEach((value, key) => {
                        if (key === Item.Apple) {
                            totalPrice += Price.Apple * value;
                        } else if (key === Item.Water) {
                            totalPrice += Price.Water * value;
                        } else if (key === Item.Coffee) {
                            totalPrice += Price.Coffee * value;
                        }
                    });
                    const change = parseInt(args[1], 10) - totalPrice;
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
                            const numberOfCoins = Math.floor(rest / parseInt(key, 10));
                            if (numberOfCoins > 0) {
                                rest = change % parseInt(key, 10);
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
                    shoppingCart.clear();
                } else {
                    console.error("Ones place digit must not 0.");
                }
            } else if (args[0] === Command.Exit) {
                console.log("Thank you for your shopping.")
                break;
            } else {
                console.error("Undefined command.");
            }
        }
    }
}
