import "mocha";

import { expect } from "chai";
import * as sinon from "sinon";
import { SampleAbstractClass } from "./SampleAbstractClass";
import { SampleClass } from "./SampleClass";
import * as util from "./Util";
import { NS } from "./NS";
import { Example, Example2 } from "./Example";

describe("test", () => {
    afterEach(() => {
        sinon.restore();
    });

    describe("SampleAbstractClass", () => {
        it("should be able to stub", () => {
            sinon.stub(SampleAbstractClass, "return1").returns(99);
            const result = SampleAbstractClass.return1();
            expect(result).to.equal(99);
        });
    });

    describe("SampleClass", () => {
        it("should be able to stub", () => {
            sinon.stub(SampleClass, "return2").returns(99);
            const result = SampleClass.return2();
            expect(result).to.equal(99);
        });
    });

    describe("Top level function", () => {
        it("should be able to stub", () => {
            sinon.stub(util, "return3").returns(99);
            const result = util.return3();
            expect(result).to.equal(99);
        });
    });

    describe("Namespace", () => {
        it("should be able to stub", () => {
            sinon.stub(NS, "return4").returns(99);
            const result = NS.return4();
            expect(result).to.equal(99);
        });
    });

    describe("Example", () => {
        it("should not be able to stub", () => {
            const obj = new Example();
            sinon.stub(util, "return3").returns(99);
            const result = obj.return5();
            expect(result).to.equal(101);
        });
    });

    describe("Example2", () => {
        it("should not be able to stub", () => {
            const obj = new Example2();
            obj.utilFunction = () => 99;
            const result = obj.return5();
            expect(result).to.equal(101);
        });
    });
});
