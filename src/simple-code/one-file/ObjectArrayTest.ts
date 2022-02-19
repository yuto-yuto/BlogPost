import "mocha";
import { expect } from "chai";

describe("Object Array Test", () => {
    it("should be true for object", () => {
        expect({ a: 1, b: 2 }).to.not.equal({ b: 2, a: 1 });

        expect({ a: 1, b: 2 }).to.include({ a: 1, b: 2 });
        expect({ a: 1, b: 2 }).to.deep.equal({ a: 1, b: 2 });
        expect({ a: 1, b: 2 }).to.deep.equal({ b: 2, a: 1 });
    });

    it("should be true for array", () => {
        expect([1, 2, 3]).to.not.equal([1, 2, 3]);
        expect([1, 2, 3]).to.not.equal([3, 2, 1]);

        expect([1, 2, 3]).to.members([1, 2, 3]);
        expect([1, 2, 3]).to.members([3, 2, 1]);
        expect([1, 2, 3]).to.not.members([3, 2]);

        expect([1, 2, 3]).to.include(2);
        expect([1, 2, 3]).to.include(2).and.include(3);
        expect([1, 2, 3]).to.be.an("array").that.includes(2);

        expect([1, 2, 3]).to.include.members([3, 1]);

        expect([1, 2, 3]).to.deep.equal([1, 2, 3]);
        expect([1, 2, 3]).to.not.deep.equal([3, 2, 1]);
    });

    it("should be true for object array", () => {
        expect([{ a: 1, b: 1 }, { a: 2, b: 2 }]).to.not.equal([{ a: 2, b: 2 }, { a: 1, b: 1 }]);

        expect([{ a: 1, b: 1 }, { a: 2, b: 2 }]).to.deep.equal([{ a: 1, b: 1 }, { a: 2, b: 2 }]);
        expect([{ a: 1, b: 1 }, { a: 2, b: 2 }]).to.not.deep.equal([{ a: 2, b: 2 }, { a: 1, b: 1 }]);

        expect([{ a: 1, b: 1 }, { a: 2, b: 2 }]).to.include.deep.members([{ a: 1, b: 1 }, { a: 2, b: 2 }]);
        expect([{ a: 1, b: 1 }, { a: 2, b: 2 }]).to.include.deep.members([{ a: 2, b: 2 }, { a: 1, b: 1 }]);
        expect([{ a: 1, b: 1 }, { a: 2, b: 2 }]).to.include.deep.members([{ b: 2, a: 2 }, { b: 1, a: 1 }]);
    });
});