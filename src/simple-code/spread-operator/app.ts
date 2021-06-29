{
    const obj = {
        foo: 123,
        hoge: 44,
        name: "obj-name",
    };
    {
        console.log(obj);
        const spread = { ...obj };
        console.log(spread);
        console.log(`original === spread: ${obj === spread}`);
    }

    {
        console.log("---------");
        const spread = { ...obj };
        spread.foo = 555;
        spread.hoge = 999;
        console.log(obj);
        console.log(spread);
    }

    {
        console.log("---------2");
        const newObj = { ...obj, added: "HEY" };
        console.log(newObj);
        const updatedObj = { ...obj, foo: "Updated foo" };
        console.log(updatedObj);
        const opposite = { newProp: 9999, ...obj };
        console.log(opposite);
        const obj2 = { foo: "second foo", age: 15, hobby: "soccer" };
        const merged = { ...obj, ...obj2 };
        console.log(merged);
    }
    {
        console.log("---------3");
        const array = ["Hey", "Ho", "Hello"];
        const array2 = ["Boo", "Yeah", "Oops"];
        console.log([array, ...array2]);
        console.log([...array, ...array2]);
    }
    {
        console.log("---------4");
        function doSomething(...args: string[]) {
            args.forEach((value: string, index: number) => {
                console.log(`${index}:${value}`);
            });
        }
        const strs = "HELLO";
        const array = ["chair", "desk", "smartphone"];
        const obj = { foo: 11, hoge: 55 };
        doSomething(...strs);
        doSomething(...array);
        // doSomething(...obj);
    }
    {
        console.log("---------5");
        const originalObj = {
            value: "1",
            first: {
                value: "1-1",
                second: {
                    value: "2-1",
                    third: {
                        value: "3-1"
                    }
                }
            }
        };
        const copiedObj = { ...originalObj };
        console.log(copiedObj);
        copiedObj.value = "1-updated";
        copiedObj.first.value = "1-1-updated";
        copiedObj.first.second.value = "2-1-updated";
        copiedObj.first.second.third.value = "3-1-updated";
        console.log(originalObj);
    }
}
