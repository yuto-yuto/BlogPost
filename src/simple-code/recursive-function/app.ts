function calcFactorialOf(value: number): number {
    if (value < 0) {
        throw new Error("Value must be bigger than 0.");
    }
    if (value === 0) {
        return 1;
    }
    return value * calcFactorialOf(value - 1);
}
function calcFactorialByWhile(value: number): void {
    if (value < 0) {
        throw new Error("Value must be bigger than 0.");
    }
    let result = 1;
    while (value !== 0) {
        result *= value;
        value--;
    }
    console.log(result);
}

const result = calcFactorialOf(5);
console.log(result);
calcFactorialByWhile(5);