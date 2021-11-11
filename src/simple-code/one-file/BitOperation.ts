export { }

function toBits(num: number, length = 8): string {
    return num + ": " + Math.abs(num).toString(2).padStart(length, "0");
}

console.log("---- shift ----");
console.log(toBits(1 << 1));  //  2: 00000010
console.log(toBits(2 >> 1));  //  1: 00000001
console.log(toBits(2 >> 5));  //  0: 00000000
console.log(toBits(1 << 4));  // 16: 00010000
console.log(toBits(2 ** 4));    // 16: 00010000
console.log(toBits(Math.pow(2, 4)));    // 16: 00010000

console.log("---- big value ----");
console.log(toBits(2147483647 >> 0, 32));   //  2147483647: 01111111111111111111111111111111
console.log(toBits(2147483648 >> 0, 32));   // -2147483648: 10000000000000000000000000000000
console.log(toBits(2147483649 >> 0, 32));   // -2147483647: 10000000000000000000000000000001
console.log(toBits(2147483648 >>> 0, 32));  //  2147483648: 10000000000000000000000000000000
console.log(toBits(2147483649 >>> 0, 32));  //  2147483649: 10000000000000000000000000000001
console.log(toBits(4294967295 >> 0, 32));   //          -1: 11111111111111111111111111111111
console.log(toBits(4294967295 >>> 0, 32));  //  4294967295: 11111111111111111111111111111111

console.log(toBits(10.123 >> 0));
console.log(toBits(10.123 >>> 0));

console.log("---- OR AND ----");
console.log(toBits(3));      //  3: 00000011
console.log(toBits(13));     // 13: 00001101
console.log(toBits(3 | 13)); // 15: 00001111
console.log(toBits(3 & 13)); //  1: 00000001
console.log(toBits(3 ^ 13)); // 14: 00001110

console.log("---- NOT ----");
console.log(toBits(3, 32));           //   3: 00000000000000000000000000000011
console.log(toBits(~3, 32));          //  -4: 11111111111111111111111111111100
console.log(toBits(13, 32));          //  13: 00000000000000000000000000001101
console.log(toBits(~13, 32));         // -14: 11111111111111111111111111110010
console.log(toBits(~0xFFFFFFFF, 32)); //   0: 00000000000000000000000000000000
console.log(toBits(~0, 32));        //         -1: 00000000000000000000000000000001
console.log(toBits(~0 >>> 0, 32));  // 4294967295: 11111111111111111111111111111111

console.log("---- up to 32 bits ----");
console.log(toBits(2147483649, 32));              //  2147483649: 10000000000000000000000000000001
console.log(toBits(2147483649 | 0, 32));          // -2147483647: 10000000000000000000000000000001
console.log(toBits(2147483649 & 2147483649, 32)); // -2147483647: 10000000000000000000000000000001
console.log(toBits(2147483649 ^ 2, 32));          // -2147483645: 10000000000000000000000000000011
// this is one bit longer
console.log(toBits(4294967296, 33));              // 4294967296: 100000000000000000000000000000000
console.log(toBits(~4294967296, 32));             //          -1: 00000000000000000000000000000001

function isBitOn(value: number, bit: number): boolean {
    const bitValue = 1 << bit;
    return (value & bitValue) > 0;
}

console.log(toBits(4));     // 4: 00000100
console.log(isBitOn(4, 0)); // false
console.log(isBitOn(4, 1)); // false
console.log(isBitOn(4, 2)); // true
console.log(isBitOn(4, 3)); // false

function turnOn1(value: number, bit: number): number {
    if (isBitOn(value, bit)) { return value; }
    const bitValue = 1 << bit;
    return value + bitValue;
}
function turnOn2(value: number, bit: number): number {
    const bitValue = 1 << bit;
    return value | bitValue;
}

{
    console.log("--- turn a bit on ---");
    console.log(toBits(4));     //  4: 00000100
    const result1 = turnOn1(4, 5);
    const result2 = turnOn2(4, 5);
    console.log(toBits(result1)); // 36: 00100100
    console.log(toBits(result2)); // 36: 00100100
}

{
    console.log("--- xor ---");
    console.log(toBits(0xF3));      // 243: 11110011
    console.log(toBits(7));         //   7: 00000111
    console.log(toBits(0xF3 ^ 7));  // 244: 11110100
}

function turnOff1(value: number, bit: number): number {
    if (!isBitOn(value, bit)) {
        return value;
    }
    const bitValue = 1 << bit;
    return value - bitValue;
}
function turnOff2(value: number, bit: number): number {
    const bitValue = 1 << bit;
    const reversed = 0xFFFFFFFF ^ bitValue;
    return value & reversed;
}
function turnOff3(value: number, bit: number): number {
    const bitValue = 1 << bit;
    return value & ~bitValue;
}
{
    console.log("--- turn a bit off ---");
    console.log(toBits(36));          // 36: 00100100
    const result1 = turnOff1(36, 5);
    const result2 = turnOff2(36, 5);
    const result3 = turnOff3(36, 5);
    console.log(toBits(result1));     //  4: 00000100
    console.log(toBits(result2));     //  4: 00000100
    console.log(toBits(result3));     //  4: 00000100
}