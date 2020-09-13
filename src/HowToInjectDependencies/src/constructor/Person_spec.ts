import { expect } from "chai";
import * as sinon from "sinon";
import { Person } from "./Person";
import { Ability, Rank } from "../Ability";

describe("Person - constructor", () => {
    let ability: Ability;
    beforeEach(() => {
        ability = new Ability();
    })
    describe("calculatePoint", () => {
        it("should return 15 when Rank is A", () => {
            sinon.stub(ability).getAbility.returns(Rank.A);
            const instance = new Person(ability);
            const result = instance.calculatePoint();
            expect(result).to.equal(15);
        });
        it("should return 10 when Rank is B", () => {
            sinon.stub(ability).getAbility.returns(Rank.B);
            const instance = new Person(ability);
            const result = instance.calculatePoint();
            expect(result).to.equal(10);
        });
        it("should return 5 when Rank is C", () => {
            sinon.stub(ability).getAbility.returns(Rank.C);
            const instance = new Person(ability);
            const result = instance.calculatePoint();
            expect(result).to.equal(5);
        });
    });
});
