import { DataHolder } from "./DataHolder";

interface Product {
    id: string;
    color: string;
    name: string;
    price: number;
}

class ProductHolder extends DataHolder<Product, string>{
    protected isAdded(receivedItem: Product): boolean {
        return !this.currentItems.has(this.getId(receivedItem));
    }
    protected isDeleted(receivedItems: Product[], currentItem: Product): boolean {
        return !receivedItems.some((item) => this.getId(item) === this.getId(currentItem));
    }
    protected getId(item: Product): string {
        return `${item.id}_${item.color}`;
    }
}

const holder = new ProductHolder();
const products = {
    black: { id: "desk", color: "black", name: "super-desk", price: 100 },
    yellow: { id: "desk", color: "yellow", name: "super-desk", price: 99 },
    white: { id: "desk", color: "white", name: "super-desk", price: 122 },
    green: { id: "desk", color: "green", name: "super-desk", price: 87 },
};

console.log(holder.process([products.black, products.green]));

// {
//     addedItems: [
//       { id: 'desk', color: 'black', name: 'super-desk', price: 100 },
//       { id: 'desk', color: 'green', name: 'super-desk', price: 87 }
//     ],
//     deletedItems: []
// }
console.log(holder.process([products.black, products.green, products.yellow]));
// {
//     addedItems: [ { id: 'desk', color: 'yellow', name: 'super-desk', price: 99 } ],
//     deletedItems: []
// }
console.log(holder.process([products.yellow, products.white]));
// {
//     addedItems: [ { id: 'desk', color: 'white', name: 'super-desk', price: 122 } ],
//     deletedItems: [
//       { id: 'desk', color: 'black', name: 'super-desk', price: 100 },
//       { id: 'desk', color: 'green', name: 'super-desk', price: 87 }
//     ]
// }