import "mocha";
import { expect, use } from "chai";
import * as sinon from "sinon";

import {
    constReturn1,
    constReturnObj, functionReturn1, functionReturnObj
} from "../lib/TopLevelFuncStub";

describe("TopLevelFuncStub 2", () => {
    afterEach(() => {
        sinon.restore();
    });

    let obj = {
        constReturn1: constReturn1,
        functionReturn1: functionReturn1,
        constReturnObj: constReturnObj,
        functionReturnObj: functionReturnObj,
    };

    describe('constReturn1', () => {
        [
            () => sinon.stub(obj, "constReturn1").returns(55),
            () => sinon.stub(obj, "constReturn1").get(() => 55),
            () => sinon.stub(obj, "constReturn1").callsFake(() => 55),
        ].forEach((stubFunc) => {
            it("should not be able to stub", () => {
                stubFunc();
                expect(constReturn1()).to.equal(1);
            });
        });
    });

    describe("functionReturn1", () => {
        [
            () => sinon.stub(obj, "functionReturn1").returns(55),
            () => sinon.stub(obj, "functionReturn1").get(() => 55),
            () => sinon.stub(obj, "functionReturn1").callsFake(() => 55),
        ].forEach((stubFunc) => {
            it("should not be able to stub", () => {
                stubFunc();
                expect(functionReturn1()).to.equal(1);
            });
        });
    });

    describe("constReturnObj", () => {
        const result = {
            prop1: 99,
            prop2: 88,
        };

        [
            () => sinon.stub(obj, "constReturnObj").returns(result),
            () => sinon.stub(obj, "constReturnObj").get(() => result),
            () => sinon.stub(obj, "constReturnObj").callsFake(() => result),
        ].forEach((stubFunc) => {
            it("should not be able to stub", () => {
                stubFunc();
                expect(constReturnObj()).to.deep.equal({
                    prop1: 11,
                    prop2: 22,
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
            () => sinon.stub(obj, "functionReturnObj").returns(result),
            () => sinon.stub(obj, "functionReturnObj").get(() => result),
            () => sinon.stub(obj, "functionReturnObj").callsFake(() => result),
        ].forEach((stubFunc) => {
            it("should not be able to stub", () => {
                stubFunc();
                expect(functionReturnObj()).to.deep.equal({
                    prop1: 11,
                    prop2: 22,
                });
            });
        });
    });
});

