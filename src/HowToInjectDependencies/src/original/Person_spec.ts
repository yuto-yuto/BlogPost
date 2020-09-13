import { expect } from "chai";
import * as sinon from "sinon";
import { Person } from "./Person";
import { Ability, Rank } from "../Ability";

describe("Person - original", () => {
    let ability: Ability;
    let fakeTimer: sinon.SinonFakeTimers;
    beforeEach(() => {
        ability = new Ability();
    });
    afterEach(() => {
        fakeTimer.restore();
    });

    describe("calculatePoint", () => {
        it("should return 15 when Rank is A", () => {
            const fakeTime = new Date(2020, 10, 10, 9);
            fakeTimer = sinon.useFakeTimers({ now: fakeTime });
            sinon.stub(ability).getAbility.returns(Rank.A);
            const instance = new Person();
            const result = instance.calculatePoint();
            expect(result).to.equal(15);
        });
        it("should return 10 when Rank is B", () => {
            const fakeTime = new Date(2020, 10, 10, 13);
            fakeTimer = sinon.useFakeTimers({ now: fakeTime });
            sinon.stub(ability).getAbility.returns(Rank.B);
            const instance = new Person();
            const result = instance.calculatePoint();
            expect(result).to.equal(10);
        });
        it("should return 5 when Rank is C", () => {
            const fakeTime = new Date(2020, 10, 10, 7);
            fakeTimer = sinon.useFakeTimers({ now: fakeTime });
            sinon.stub(ability).getAbility.returns(Rank.C);
            const instance = new Person();
            const result = instance.calculatePoint();
            expect(result).to.equal(5);
        });
    });
});
