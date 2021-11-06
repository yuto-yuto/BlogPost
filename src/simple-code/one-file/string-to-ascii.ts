function byCharCodeAt(str: string): number[] {
    return str.split("").map((x) => x.charCodeAt(0));
}
function byCharCodeAt2(str: string): number[] {
    const result = new Array(16).fill(0);
    for (let i = 0; i < str.length; i++) {
        result[i] = str.charCodeAt(i);
    }
    return result;
}
function byCodePointAt(str: string): number[] {
    return str.split("").map((x) => x.codePointAt(0)!);
}
function byCodePointAt2(str: string): number[] {
    const result = [];
    for (let i = 0; i < str.length; i++) {
        result.push(str.codePointAt(i)!);
    }
    return result;
}

function compare(str: string): void {
    console.log(str);
    console.log("length        : " + str.length);
    console.log("split         : " + str.split(""));
    console.log("spread        : " + [...str]);
    console.log("Array.from    : " + Array.from(str));
    const result1 = byCharCodeAt(str);
    console.log("byCharCodeAt  : " + result1);
    console.log("  --> " + String.fromCharCode(...result1));

    const result2 = byCodePointAt(str);
    console.log("byCodePointAt : " + result2);
    console.log("  --> " + String.fromCodePoint(...result2));

    const result3 = byCodePointAt2(str);
    console.log("byCodePointAt2: " + result3);
    console.log("  --> " + String.fromCodePoint(...result3));
    console.log();

    const result4 = [...str].map((x) => x.codePointAt(0)!);
    console.log("byCodePointAt3: " + result4);
    console.log("  --> " + String.fromCodePoint(...result4));
}

function getLength(str: string): number {
    return [...str].length;
}

function getStringCodePointArray(str: string): number[] {
    return [...str].map((x) => x.codePointAt(0)!);
}

{
    compare("Hello World!");
    compare("こんにちは世界！");
    compare("😀🌕");
    const str = "Great😀";
    console.log(getLength(str));
    console.log(getStringCodePointArray(str));
}
