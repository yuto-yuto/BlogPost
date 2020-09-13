import { Ability, Rank } from "../Ability";

export class Person {
    private ability = new Ability();

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