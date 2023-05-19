export { }

console.log("filtering number array");
{
    const numArray = [5, 1, 78, 2, 42, 4, 11, 4];
    console.log(numArray.filter((x) => x > 10)); // [ 78, 42, 11 ]
    console.log(numArray.filter((x) => x === 78 || x === 42 || x === 11)); // [ 78, 42, 11 ]
    console.log(numArray.filter((x) => [78, 42, 11].includes(x))); // [ 78, 42, 11 ]

    console.log(numArray.some((x) => [78, 42, 11].includes(x))) // true
}

console.log("filtering string array");
{
    const strArray = ["aa", "bb", "aabb", "aa", "cc", "aacc"];
    console.log(strArray.filter((x) => x == "aa")); // [ 'aa', 'aa' ]
    console.log(strArray.filter((x) => x.includes("aa")));  // [ 'aa', 'aabb', 'aa', 'aacc' ]
    console.log(strArray.filter((x) => /aa.*/.test(x)));    // [ 'aa', 'aabb', 'aa', 'aacc' ]
}

console.log("filtering based on a object property");
class Product {
    constructor(
        public id: number,
        public name: string,
    ) { }
}
{

    const objArray: Product[] = [
        new Product(100, "water"),
        new Product(101, "apple juice"),
        new Product(102, "banana juice"),
        new Product(200, "banana"),
        new Product(201, "apple"),
    ];

    console.log(objArray.filter((item) => item.id >= 100 && item.id < 200));
    // [
    //   Product { id: 100, name: 'water' },
    //   Product { id: 101, name: 'apple juice' },
    //   Product { id: 102, name: 'banana juice' }
    // ]
    console.log(objArray.filter((item) => item.name.includes("banana")));
    // [
    //   Product { id: 102, name: 'banana juice' },
    //   Product { id: 200, name: 'banana' }
    // ]
}

console.log("filtering mixed type array");
{
    class PcProduct extends Product {
        constructor(
            id: number,
            name: string,
            public ram: string,
            public cpu: string,
        ) {
            super(id, name);
        }
    }
    class AlcoholProduct extends Product {
        constructor(
            id: number,
            name: string,
            public type: string,
        ) {
            super(id, name);
        }
    }

    const mixedArray = [
        new PcProduct(100, "laptop-pc-A", "8GB", "2.4GHz"),
        new PcProduct(101, "laptop-pc-B", "16GB", "2.4GHz"),
        new PcProduct(102, "desktop-pc-A", "32GB", "3.0GHz"),
        new AlcoholProduct(301, "Weis Beer", "Beer"),
        new AlcoholProduct(302, "Bombay Sapphire", "Gin"),
        new AlcoholProduct(303, "Glenfarclas", "Whiskey"),
        new AlcoholProduct(304, "Tanqueray", "Gin"),
    ];

    console.log(mixedArray.filter((x) => x instanceof AlcoholProduct))
    console.log(mixedArray.filter((x) => x.hasOwnProperty("type")))

    console.log(mixedArray.filter((x) => {
        if ((x instanceof AlcoholProduct)) {
            return x.type === "Gin";
        }
        return false;
    }));
    
    console.log(mixedArray.filter((x) => x instanceof AlcoholProduct && x.type === "Gin"));

}