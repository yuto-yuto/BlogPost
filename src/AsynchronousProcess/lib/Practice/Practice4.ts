import { performance } from "perf_hooks";
import { findProductAsync } from "./MyExtendedApi";
import { getProductNumbers } from "./ProductNumbers";

async function doWithFor() {
    console.log("do with for start");
    const productNumbers = getProductNumbers();
    const productList: string[] = [];
    for (const productNumber of productNumbers) {
        const info = await findProductAsync(productNumber);
        const format = `${info.productNumber}: ${info.name}: ${info.price}`;
        productList.push(format);
    }
    console.log(productList);
    console.log("do with for end");
}

async function doWithMap() {
    console.log("do with map start");
    const productNumbers = getProductNumbers();
    const promises = productNumbers
        .map((productNumber) => findProductAsync(productNumber));
    const productList = await Promise.all(promises);
    console.log(productList);
    console.log("do with map end");
}

const start = performance.now();
// doWithFor()
doWithMap()
    .finally(() => {
        console.log(`time: ${performance.now() - start}`);
    });