import { ItemHolder, ItemName } from "./Item";

export interface ItemCount {
    name: ItemName;
    numberOfItems: number;
}

export class ShoppingCart {
    private items = new Map<ItemName, number>();

    public get totalItemNumber(): number {
        return Array.from(this.items.values())
            .reduce((acc, cur) => acc + cur, 0);
    }

    public get totalPrice(): number {
        let result = 0;
        this.items.forEach((numberOfItems, key) => {
            const item = ItemHolder.getItemOf(key);
            result = item.price * numberOfItems;
        });
        return result;
    }

    public addItem(itemName: ItemName, numberOfItems: number): void {
        const currentNumber = this.items.get(itemName) || 0;
        this.items.set(itemName, currentNumber + numberOfItems);
    }

    /**
     * 
     * @param itemName Item name to add into a cart
     * @param numberOfItems number of items removed from a cart.
     * If the value is not integer it is truncated.
     */
    public removeItem(itemName: ItemName, numberOfItems: number): void {
        if (numberOfItems <= 0) {
            throw new Error(`numberOfItems to remove must be 1 or bigger number. specified value [${numberOfItems}]`)
        }

        const currentNumber = this.items.get(itemName) || 0;
        const result = currentNumber - Math.floor(numberOfItems);
        if (result <= 0) {
            this.items.delete(itemName);
        } else {
            this.items.set(itemName, result);
        }
    }

    public getList(): ItemCount[] {
        return Array.from(this.items.entries())
            .map(([name, numberOfItems]) => {
                return { name, numberOfItems }
            });
    }
}
