import { DecoratorType } from "./DecoratorType";
import { AsteriskDecorator } from "./AsteriskDecorator";
import { EqualDecorator } from "./EqualDecorator";
import { DefaultDecorator } from "./DefaultDecorator";
import { Decorator } from "./Decorator";

export class Editor {

    public edit(text: string, type?: DecoratorType): string {
        const decorator = this.getDecorator(type);
        const decoratedText = decorator.decorate(text);
        if (decoratedText.length > 100) {
            throw new Error("Length must be less than 100.");
        }
        return decoratedText;
    }

    private getDecorator(type?: DecoratorType): Decorator {
        switch (type) {
            case DecoratorType.Asterisk:
                return new AsteriskDecorator();
            case DecoratorType.Equal:
                return new EqualDecorator();
            default:
                return new DefaultDecorator();
        }
    }
}
