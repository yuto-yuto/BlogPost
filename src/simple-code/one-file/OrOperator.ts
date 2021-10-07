export { };
function getTitle(value: unknown) {
    let title = value;
    if (Array.isArray(value)) {
        title = "[]";
    } else if (typeof value === "string") {
        title = '""';
    }
    return title;
}

function ternaryOperator1(value: unknown) {
    const result = value !== undefined ? value : "default value";
    console.log(`${getTitle(value)}\t: ${result}`);
}

function ternaryOperator2(value: unknown) {
    const result = value ? value : "default value";
    console.log(`${getTitle(value)}\t: ${result}`);
}

function orOperator1(value: unknown) {
    const result = value || "default value";
    console.log(`${getTitle(value)}\t: ${result}`);
}

function nullOperator(value: unknown) {
    const result = value ?? "default value";
    console.log(`${getTitle(value)}\t: ${result}`);
}

function setInterval1(value: number) {
    return value || 10;
}

function setInterval2(value: number) {
    return value ?? 10;
}

function setInterval3(value: number) {
    const currentOrDefault = value ?? 10;
    return currentOrDefault !== 0 ? currentOrDefault : 10;
}

function getEnableState1(value: boolean | undefined | null) {
    const title = getTitle(value);
    console.log(`${title}\t ${value || false}`);
    console.log(`${title}\t ${value || true}`);
}
function getEnableState2(value: boolean | undefined | null) {
    const title = getTitle(value);
    console.log(`${title}\t ${value ?? false}`);
    console.log(`${title}\t ${value ?? true}`);
}

function getValueOrDefault(value: unknown, defaultValue: unknown) {
    return value || defaultValue;
}
console.log(getValueOrDefault(undefined, 10));

const values = [undefined, null, "", 0, [], false];
console.log("--- ternary operator 1 ---");
values.forEach(ternaryOperator1);

console.log("--- ternary operator 2 ---");
values.forEach(ternaryOperator2);

console.log("--- or operator 1 ---");
values.forEach(orOperator1);

console.log("--- null operator ---");
values.forEach(nullOperator);

console.log("--- null operator for boolean 1---");
[undefined, null, false, true].forEach(getEnableState1);
console.log("--- null operator for boolean 2---");
[undefined, null, false, true].forEach(getEnableState2);

console.log(setInterval1(undefined as any));
console.log(setInterval1(null as any));
console.log(setInterval1(0));
console.log(setInterval1(1));

console.log(setInterval2(undefined as any));
console.log(setInterval2(null as any));
console.log(setInterval2(0));
console.log(setInterval2(1));

console.log(setInterval3(undefined as any));
console.log(setInterval3(null as any));
console.log(setInterval3(0));
console.log(setInterval3(1));