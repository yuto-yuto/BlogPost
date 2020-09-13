import { Ability, Rank } from "../Ability";

export class Person {
    private _ability?: Ability

    public set ability(value: Ability) {
        this._ability = value;
    }

    public calculatePoint(): number {
        if (!this._ability) {
            throw new Error("ability instance is undefined.");
        }
        const rank = this._ability.getAbility();
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