import { Decorator } from "./Decorator";

export class DefaultDecorator implements Decorator {
    decorate(text: string): string {
        return `{ ${text} }`;
    }
}
