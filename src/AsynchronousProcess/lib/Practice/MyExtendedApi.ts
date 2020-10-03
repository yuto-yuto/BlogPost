import { findProduct, ProductInfo } from "./ProductApi";

export function findProductAsync(productNumber: number): Promise<ProductInfo> {
    return new Promise((resolve) => {
        findProduct(productNumber, (value: ProductInfo) => {
            resolve(value);
        });
    });
}