import { expect } from "chai";
import "mocha";
import { SecondSingleton } from "../lib/SecondSingleton";

describe("SecondSingleton", () => {
    let instance: SecondSingleton;
    beforeEach(() => {
        instance = new SecondSingleton();
    });

    describe("greet", () => {
        it("should return hello for the first call", () => {
            const result = instance.greet();
            expect(result).to.equal("hello");
        });
        it("should return how are you for the second call", () => {
            instance.greet();
            const result = instance.greet();
            expect(result).to.equal("how are you");
        });
        it("should return see you again for the third call", () => {
            instance.greet();
            instance.greet();
            const result = instance.greet();
            expect(result).to.equal("see you again");
        });
    });
});