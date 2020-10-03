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
    const displayResult = () => {
        const timeout = 100;
        global.setTimeout(() => {
            if (productList.length === 10) {
                console.log(productList);
            } else {
                displayResult();
            }
        }, timeout);
    };
    displayResult();
}
