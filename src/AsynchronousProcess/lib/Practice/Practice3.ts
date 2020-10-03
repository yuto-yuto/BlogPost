import { findProductAsync } from "./MyExtendedApi";
import { getProductNumbers } from "./ProductNumbers";

{
    const productNumbers = getProductNumbers();
    const productList: string[] = [];
    productNumbers.forEach(async (productNumber) => {
        const info = await findProductAsync(productNumber);
        const format = `${info.productNumber}: ${info.name}: ${info.price}`;
        productList.push(format);
    });
    console.log(productList);
}

