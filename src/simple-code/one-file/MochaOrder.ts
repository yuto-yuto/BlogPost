import "mocha";
import { expect } from "chai";

describe("TOP", () => {
    before(() => {
        console.log("- TOP before");
    });
    beforeEach(() => {
        console.log("= TOP beforeEach");
    });

    after(() => {
        console.log("- TOP after");
    });
    afterEach(() => {
        console.log("= TOP afterEach");
    });

    it("top level test case", () => {
        console.log(" --- top level test done");
    });

    describe("Nested", () => {
        before(() => {
            console.log("  - Nested before");
        });

        beforeEach(() => {
            console.log("  = Nested beforeEach");
        });

        after(() => {
            console.log("  - Nested after");
        });
        afterEach(() => {
            console.log("  = Nested afterEach");
        });

        it("nested test case", () => {
            console.log(" --- nested test done");
        });

        describe("Nested-2", () => {
            before(() => {
                console.log("    - Nested-2 before");
            });

            beforeEach(() => {
                console.log("    = Nested-2 beforeEach");
            });

            after(() => {
                console.log("    - Nested-2 after");
            });
            afterEach(() => {
                console.log("    = Nested-2 afterEach");
            });
            it("nested-2 test case", () => {
                console.log("    --- nested-2 test done");
            });
        });
    });
});