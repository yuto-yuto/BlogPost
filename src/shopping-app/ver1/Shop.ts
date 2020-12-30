import * as readSync from "readline-sync";

export class Shop {
    public run() {
        console.log("Welcome to special shop. This is what you can do.");
        let commandList = "command: list the available commands\n";
        commandList += "list: show the item list and prices\n";
        commandList += "add: add the item to shopping cart. Format is `add <item name> <number>`\n";
        commandList += "remove: remove the item from the shopping cart. Format is `remove <item name> <number>`\n";
        commandList += "cart: list items in shopping cart\n";
        commandList += "pay: pay the cost and receive change. Format is `pay <money>`\n";
        console.log(commandList);

        const shoppingCart = new Map<string, number>();

        while (true) {
            const commandString = readSync.question("Input command: ");
            const args = commandString.split(" ");
            if (args[0] === "command") {
                console.log(commandList);
            } else if (args[0] === "list") {
                let itemList = "apple, 110\n";
                itemList += "water, 90\n";
                itemList += "coffee, 150\n";
                console.log(itemList);
            } else if (args[0] === "add") {
                if (args[1] === "apple") {
                    const currentNumber = shoppingCart.get("apple") || 0;
                    const addedNumber = parseInt(args[2]);
                    shoppingCart.set("apple", currentNumber + addedNumber);
                } else if (args[1] === "water") {
                    const currentNumber = shoppingCart.get("water") || 0;
                    const addedNumber = parseInt(args[2]);
                    shoppingCart.set("water", currentNumber + addedNumber);
                } else if (args[1] === "coffee") {
                    const currentNumber = shoppingCart.get("coffee") || 0;
                    const addedNumber = parseInt(args[2]);
                    shoppingCart.set("coffee", currentNumber + addedNumber);
                } else {
                    console.log(`${args[1]} doesn't exist.`);
                }
            } else if (args[0] === "remove") {
                const currentNumber = shoppingCart.get(args[1]) || 0;
                const removeNumber = parseInt(args[2]);
                const result = currentNumber - removeNumber;
                if (result <= 0) {
                    shoppingCart.delete(args[1]);
                } else {
                    shoppingCart.set(args[1], result);
                }
            } else if (args[0] === "cart") {
                let cart = "";
                let totalNumber = 0;
                let totalPrice = 0;
                shoppingCart.forEach((value, key) => {
                    cart += `${key}: ${value}\n`;
                    totalNumber += value;
                    if (key === "apple") {
                        totalPrice += 110 * value;
                    } else if (key === "water") {
                        totalPrice += 90 * value;
                    } else if (key === "coffee") {
                        totalPrice += 150 * value;
                    }
                });

                const message = cart + `\ntotal number: ${totalNumber}\n`
                    + `total price: ${totalPrice}`;
                console.log(message);
            } else if (args[0] === "pay") {
                if (args[1].slice(-1) === "0") {
                    let totalPrice = 0;
                    shoppingCart.forEach((value, key) => {
                        if (key === "apple") {
                            totalPrice += 110 * value;
                        } else if (key === "water") {
                            totalPrice += 90 * value;
                        } else if (key === "coffee") {
                            totalPrice += 150 * value;
                        }
                    });
                    const change = parseInt(args[1]) - totalPrice;
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
                    shoppingCart.clear();
                } else {
                    console.error("Ones place digit must not 0.");
                }
            } else if (args[0] === "exit") {
                console.log("Thank you for your shopping.")
                break;
            } else {
                console.error("Undefined command.");
            }
        }
    }
}
