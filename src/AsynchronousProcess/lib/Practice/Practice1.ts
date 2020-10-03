import { findProduct, ProductInfo } from "./ProductApi"
import { getProductNumbers } from "./ProductNumbers";

{
    const productNumbers = getProductNumbers();
    const productList: string[] = [];
    productNumbers.forEach((productNumber) => {
        findProduct(productNumber, (value: ProductInfo) => {
            const format = `${value.productNumber}: ${value.name}: ${value.price}`;
            productList.push(format);
        });
    });
    console.log(productList);
}
