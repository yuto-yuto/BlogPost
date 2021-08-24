export { };

enum MyEnum {
    A,
    B,
    C,
}

function doSwitch(value: MyEnum) {
    switch (value) {
        case MyEnum.A: return true;
        case MyEnum.B: return true;
        case MyEnum.C: return true;
        default: {
            const exhaustiveCheck: never = value;
            throw new Error(exhaustiveCheck);
        }
    }
}

function doIf(value: MyEnum) {
    if (value === MyEnum.A) { return true; }
    else if (value === MyEnum.B) { return true; }
    else if (value === MyEnum.C) { return true; }
    else {
        const exhaustiveCheck: never = value;
        // throw new Error(exhaustiveCheck);
    }
}