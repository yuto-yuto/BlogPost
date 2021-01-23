import { ShoppingConsole } from "./MyConsole";
import { Shop } from "./Shop";

const shoppingConsole = new ShoppingConsole();
let shop = new Shop(shoppingConsole);
shop.run();
