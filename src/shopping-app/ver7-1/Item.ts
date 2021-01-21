export enum ItemName {
    Apple = "apple",
    Water = "water",
    Coffee = "coffee",
}

export interface Item {
    name: string;
    price: number;
}

export class ItemHolder {
    private static items: Item[] = [
        Object.freeze({ name: ItemName.Apple, price: 110 }),
        Object.freeze({ name: ItemName.Coffee, price: 150 }),
        Object.freeze({ name: ItemName.Water, price: 90 }),
    ];

    public static getItemOf(name: string): Item {
        const result = this.items.find((value) => value.name === name);
        if (!result) {
            throw new Error(`Specified item name is undefined [${name}]`);
        }
        return result;
    }
    public static get list(): Item[] {
        return this.items;
    }
}
