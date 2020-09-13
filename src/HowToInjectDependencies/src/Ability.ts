export enum Rank {
    A = "A",
    B = "B",
    C = "C",
}

export class Ability {
    public getAbility(): Rank {
        const date = new Date();
        const hours = date.getHours();
        if (hours < 8) {
            return Rank.C;
        } else if (hours < 12) {
            return Rank.A;
        }
        return Rank.B
    }
}