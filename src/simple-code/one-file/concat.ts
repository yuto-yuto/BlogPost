{
    const str1 = "Hello";
    const str2 = "I'm";
    const str3 = "Yuto";

    const msg = str1 + "," + str2 + " " + str3;
    const msg2 = `${str1}, ${str2} ${str3}`;
    const msg3 = str1.concat(str2, str3);
    console.log(msg);
    console.log(msg2);
}

{
    const longKeywordVariable = "key";
    const longKeywordNumber = 12
    const longKeywordValue = "value";
    const msg = `${longKeywordVariable}-${longKeywordNumber}-${longKeywordValue}`;
    const msg2 = `${longKeywordVariable}-
${longKeywordNumber}-
${longKeywordValue}`;
    console.log(msg);
    console.log(msg2);

    const msg3 = `${longKeywordVariable}-`
        + `${longKeywordNumber}-`
        + `${longKeywordValue}`;
    const msg4 = [
        longKeywordVariable,
        longKeywordNumber,
        longKeywordValue,
    ].join("-");
    console.log(msg3);
    console.log(msg4);
}

import { performance } from "perf_hooks";
{
    function doLoop(cb: () => void) {
        for (let i = 0; i < 1000000; i++) {
            cb();
        }
    }
    type TestDataType = { startStr: string, copiedStr: string };
    const copiedStr = "x".repeat(100);
    function measure(title: string, cb: (args: TestDataType) => void) {
        const start = performance.now();
        const args = { startStr: "", copiedStr };
        cb(args);
        const result = performance.now() - start;
        console.log(`result(${title}): ${Math.round(result)} ms`);
    }

    const runConcat = () => measure("concat with", (args: TestDataType) => {
        const cb = () => {
            args.startStr = args.startStr.concat(args.copiedStr);
        }
        doLoop(cb);
    });
    const runPlus = () => measure("+ operator", (args: TestDataType) => {
        const cb = () => { args.startStr += args.copiedStr };
        doLoop(cb);
    });
    const runLiteral = () => measure("Template Literal", (args: TestDataType) => {
        const cb = () => {
            args.startStr = `${args.startStr}${args.copiedStr}`;
        };
        doLoop(cb);
    });
    const runJoin = () => measure("Array.join with loop", () => {
        const result: string[] = [];
        doLoop(() => {
            result.push(copiedStr);
        });
        result.join("");
    });

    const runReduce = () => measure("Array.reduce with loop", () => {
        const result: string[] = [];
        doLoop(() => {
            result.push(copiedStr);
        });
        result.reduce((pre, cur) => pre + cur);
    });

    // ------ without loop -------

    const array: string[] = [];
    doLoop(() => {
        array.push(copiedStr);
    });

    const runConcatWithout = () => {
        measure("concat without loop", (args: TestDataType) => {
            args.startStr.concat(...array);
        });
    }
    const runJoinWithout = () => measure("Array.join without loop", () => array.join(""));

    const runReduceWithout = () => measure("Array.reduce without loop", () => {
        array.reduce((pre, cur) => pre + cur);
    });

    for (let i = 0; i < 10; i++) {
        runConcat();
        // runConcatWithout();
        // runLiteral();
        // runPlus();
        // runJoin();
        // runJoinWithout();
        // runReduce();
        // runReduceWithout();
    }
}
