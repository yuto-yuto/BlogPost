export function calc1(value: number) {
    if (value === 1 ||
        value === 3 ||
        value === 5 ||
        value === 12
    ) {
        return 20;
    }
    return 10;
}

export function calc2(value: number) {
    if (value < 12 || value > 17) {
        return 50;
    }
    return 0;
}