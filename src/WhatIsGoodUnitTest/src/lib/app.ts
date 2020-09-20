import { Editor } from "./Editor";
import { DecoratorType } from "./DecoratorType";

const printer = new Editor();
const text = "I AM VERY HAPPY."

console.log("Decorator type: Default")
console.log(printer.edit(text));

console.log("Decorator type: Asterisk")
console.log(printer.edit(text, DecoratorType.Asterisk));

console.log("Decorator type: Equal")
console.log(printer.edit(text, DecoratorType.Equal));
