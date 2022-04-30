export interface Result {
    prop1: number;
    prop2: number;
}
export const constReturn1 = (): number => {
    return 1;
};

export const constReturnObj = (): Result => {
    return {
        prop1: 11,
        prop2: 22,
    };
};

export function functionReturn1(): number {
    return 1;
}

export function functionReturnObj(): Result {
    return {
        prop1: 11,
        prop2: 22,
    };
};
