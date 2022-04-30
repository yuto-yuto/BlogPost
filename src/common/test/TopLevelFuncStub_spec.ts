import "mocha";
import { expect, use } from "chai";
import * as sinon from "sinon";
import * as TopLevel from "../lib/TopLevelFuncStub";
import { constReturn1 } from "../lib/TopLevelFuncStub";

describe("TopLevelFuncStub", () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('constReturn1', () => {
        [
            () => sinon.stub(TopLevel, "constReturn1").returns(55),
            () => sinon.stub(TopLevel, "constReturn1").get(() => sinon.stub().returns(55)),
            () => sinon.stub(TopLevel, "constReturn1").callsFake(() => 55),
        ].forEach((stubFunc) => {
            it("should not be able to stub", () => {
                stubFunc();
                expect(constReturn1()).to.equal(55);
                expect(TopLevel.constReturn1()).to.equal(55);
            });
        });
    });

    describe("functionReturn1", () => {
        [
            () => sinon.stub(TopLevel, "functionReturn1").returns(55),
            () => sinon.stub(TopLevel, "functionReturn1").get(() => sinon.stub().returns(55)),
            () => sinon.stub(TopLevel, "functionReturn1").callsFake(() => 55),
        ].forEach((stubFunc) => {
            it("should not be able to stub", () => {
                stubFunc();
                expect(TopLevel.functionReturn1()).to.equal(55);
            });
        });
    });

    describe("constReturnObj", () => {
        const result = {
            prop1: 99,
            prop2: 88,
        };

        [
            () => sinon.stub(TopLevel, "constReturnObj").returns(result),
            () => sinon.stub(TopLevel, "constReturnObj").get(() => sinon.stub().returns(result)),
            () => sinon.stub(TopLevel, "constReturnObj").callsFake(() => result),
        ].forEach((stubFunc) => {
            it("should not be able to stub", () => {
                stubFunc();
                expect(TopLevel.constReturnObj()).to.deep.equal({
                    prop1: 99,
                    prop2: 88,
                });
            });
        });
    });
    describe("functionReturnObj", () => {
        const result = {
            prop1: 99,
            prop2: 88,
        };

        [
            () => sinon.stub(TopLevel, "functionReturnObj").returns(result),
            () => sinon.stub(TopLevel, "functionReturnObj").get(() => sinon.stub().returns(result)),
            () => sinon.stub(TopLevel, "functionReturnObj").callsFake(() => result),
        ].forEach((stubFunc) => {
            it("should not be able to stub", () => {
                stubFunc();
                expect(TopLevel.functionReturnObj()).to.deep.equal({
                    prop1: 99,
                    prop2: 88,
                });
            });
        });
    });
});
