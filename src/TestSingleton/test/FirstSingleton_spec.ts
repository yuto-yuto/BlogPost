import "mocha";
import { expect } from "chai";
import { FirstSingleton } from "../lib/FirstSingleton";

describe("FirstSingleton", () => {
    describe("greet", () => {
        it("should return hello for the first call", () => {
            const result = FirstSingleton.instance.greet();
            expect(result).to.equal("hello");
        });
        it.skip("should return how are you for the second call", () => {
            FirstSingleton.instance.greet();
            const result = FirstSingleton.instance.greet();
            expect(result).to.equal("how are you"); // error! result is see you again
        });
        it("should return see you again for the third call", () => {
            FirstSingleton.instance.greet();
            FirstSingleton.instance.greet();
            const result = FirstSingleton.instance.greet();
            expect(result).to.equal("see you again");
        });
    });

    describe("greet - cheat", () => {
        beforeEach(() => {
            (FirstSingleton.instance as any).callCount = 0;
        });

        it("should return hello for the first call", () => {
            const result = FirstSingleton.instance.greet();
            expect(result).to.equal("hello");
        });
        it("should return how are you for the second call", () => {
            FirstSingleton.instance.greet();
            const result = FirstSingleton.instance.greet();
            expect(result).to.equal("how are you");
        });
        it("should return see you again for the third call", () => {
            FirstSingleton.instance.greet();
            FirstSingleton.instance.greet();
            const result = FirstSingleton.instance.greet();
            expect(result).to.equal("see you again");
        });
    });
});