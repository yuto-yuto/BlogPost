import { Ability } from "../Ability";

export class AbilityFactory {
    public static create(): Ability {
        return new Ability();
    }
}