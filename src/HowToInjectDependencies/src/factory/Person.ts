import { Ability, Rank } from "../Ability";
import { AbilityFactory } from "./AbilityFactory";

export class Person {
    private ability: Ability
    constructor() {
        this.ability = AbilityFactory.create();
    }
    public calculatePoint(): number {
        const rank = this.ability.getAbility();
        const base = 5;
        let additionalPoint = 0;
        if (rank === Rank.A) {
            additionalPoint = 10;
        } else if (rank === Rank.B) {
            additionalPoint = 5;
        }
        return base + additionalPoint;
    }
}