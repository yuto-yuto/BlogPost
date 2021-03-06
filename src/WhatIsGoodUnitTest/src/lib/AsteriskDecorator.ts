import { Decorator } from "./Decorator";

export class AsteriskDecorator implements Decorator {
    decorate(text: string): string {
        const frame = "*".repeat(text.length + 4) + "\n";
        return frame + text + "\n" + frame;
    }
}
