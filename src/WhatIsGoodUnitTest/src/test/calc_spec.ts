import { expect } from "chai";
import { calc1, calc2 } from "../lib/calc";

describe("calc", () => {
    describe("calc1", () => {
        it("should return 20 when value is 1 or 3 or 5 or 12", () => {
            [1, 3, 5, 12].forEach((value) => {
                const result = calc1(value);
                expect(result).to.equal(20);
            });
        });

        [1, 3, 5, 12].forEach((value) => {
            it(`should return 20 when value is ${value}`, () => {
                const result = calc1(value);
                expect(result).to.equal(20);
            });
        });
    });

    describe("calc2", () => {
        it("should return 50 when value is 11", () => {
            const result = calc2(11);
            expect(result).to.equal(50);
        });
        it("should return 50 when value is 18", () => {
            const result = calc2(18);
            expect(result).to.equal(50);
        });
        it("should return 0 when value is 12", () => {
            const result = calc2(12);
            expect(result).to.equal(0);
        });
        it("should return 0 when value is 17", () => {
            const result = calc2(17);
            expect(result).to.equal(0);
        });
[
    { input: 10, expected: 50 },
    { input: 11, expected: 50 },
    { input: 12, expected: 0 },
    { input: 13, expected: 0 },
    { input: 14, expected: 0 },
    { input: 15, expected: 0 },
    { input: 16, expected: 0 },
    { input: 17, expected: 0 },
    { input: 18, expected: 50 },
    { input: 19, expected: 50 },
].forEach((testData) => {
    it(`should return ${testData.expected} when value is ${testData.input}`, () => {
        const result = calc2(testData.input);
        expect(result).to.equal(testData.expected);
    });
});
    });
});