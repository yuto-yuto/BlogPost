import { expect } from "chai";
import * as sinon from "sinon";
import { Person } from "./Person";
import { Ability, Rank } from "../Ability";
import { AbilityFactory } from "./AbilityFactory";

describe("Person - factory", () => {
    let ability: Ability;
    let stubFactory: sinon.SinonStub;
    beforeEach(() => {
        ability = new Ability();
        stubFactory = sinon.stub(AbilityFactory, "create");
        stubFactory.returns(ability);
    });
    afterEach(() => {
        stubFactory.restore();
    });

    describe("calculatePoint", () => {
        it("should return 15 when Rank is A", () => {
            sinon.stub(ability).getAbility.returns(Rank.A);
            const instance = new Person();
            const result = instance.calculatePoint();
            expect(result).to.equal(15);
        });
        it("should return 10 when Rank is B", () => {
            sinon.stub(ability).getAbility.returns(Rank.B);
            const instance = new Person();
            const result = instance.calculatePoint();
            expect(result).to.equal(10);
        });
        it("should return 5 when Rank is C", () => {
            sinon.stub(ability).getAbility.returns(Rank.C);
            const instance = new Person();
            const result = instance.calculatePoint();
            expect(result).to.equal(5);
        });
    });
});
