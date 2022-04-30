import "mocha";
import { expect, use } from "chai";
import * as sinon from "sinon";
import * as TopLevel from "common";

describe("TopLevelFuncStub", () => {
    const result = {
        prop1: 99,
        prop2: 88,
    };

    afterEach(() => {
        sinon.restore();
    });

    describe('constReturn1', () => {
        it("should be able to stub", () => {
            sinon.stub(TopLevel, "constReturn1").get(() => sinon.stub().returns(55));
            expect(TopLevel.constReturn1()).to.equal(55);
        });

        [
            () => sinon.stub(TopLevel, "constReturn1").returns(55),
            () => sinon.stub(TopLevel, "constReturn1").callsFake(() => 55),
        ].forEach((stubFunc) => {
            it("should not be able to stub", () => {
                stubFunc();
                expect(TopLevel.constReturn1()).to.equal(1);
            });
        });
    });

    describe("functionReturn1", () => {
        it("should be able to stub", () => {
            sinon.stub(TopLevel, "functionReturn1").get(() => sinon.stub().returns(55));
            expect(TopLevel.functionReturn1()).to.equal(55);
        });

        [
            () => sinon.stub(TopLevel, "functionReturn1").returns(55),
            () => sinon.stub(TopLevel, "functionReturn1").callsFake(() => 55),
        ].forEach((stubFunc) => {
            it("should not be able to stub", () => {
                stubFunc();
                expect(TopLevel.functionReturn1()).to.equal(1);
            });
        });
    });

    describe("constReturnObj", () => {
        it("should be able to stub", () => {
            sinon.stub(TopLevel, "constReturnObj").get(() => sinon.stub().returns(result));
            expect(TopLevel.constReturnObj()).to.deep.equal(result);
        });

        [
            () => sinon.stub(TopLevel, "constReturnObj").returns(result),
            () => sinon.stub(TopLevel, "constReturnObj").callsFake(() => result),
        ].forEach((stubFunc) => {
            it("should not be able to stub", () => {
                stubFunc();
                expect(TopLevel.constReturnObj()).to.deep.equal({
                    prop1: 11,
                    prop2: 22,
                });
            });
        });
    });
    describe("functionReturnObj", () => {
        it("should be able to stub", () => {
            sinon.stub(TopLevel, "functionReturnObj").get(() => sinon.stub().returns(result));
            expect(TopLevel.functionReturnObj()).to.deep.equal(result);
        });

        [
            () => sinon.stub(TopLevel, "functionReturnObj").returns(result),
            () => sinon.stub(TopLevel, "functionReturnObj").callsFake(() => result),
        ].forEach((stubFunc) => {
            it("should not be able to stub", () => {
                stubFunc();
                expect(TopLevel.functionReturnObj()).to.deep.equal({
                    prop1: 11,
                    prop2: 22,
                });
            });
        });
    });
});
