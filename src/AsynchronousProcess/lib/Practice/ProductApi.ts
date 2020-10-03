export interface ProductInfo {
    productNumber: number;
    name: string;
    price: number;
}

export type ResultCallback = (value: ProductInfo) => void;

export function findProduct(productNumber: number, onValue: ResultCallback): void {
    global.setTimeout(() => {
        onValue({
            productNumber,
            name: `product name ${productNumber}`,
            price: productNumber * productNumber,
        });
    }, Math.random() * 1000);
}
