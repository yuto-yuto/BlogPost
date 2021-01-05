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
        { name: ItemName.Apple, price: 110 },
        { name: ItemName.Coffee, price: 150 },
        { name: ItemName.Water, price: 90 },
    ];

    public static getItemOf(name: string): Item {
        const result = this.items.find((value) => value.name === name);
        if (!result) {
            throw Error(`Specified item name is undefined [${name}]`);
        }
        return result;
    }
}
