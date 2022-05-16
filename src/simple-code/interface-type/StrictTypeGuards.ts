import { Person } from "./Interfaces";

export type UnknownObject = Record<string, unknown> | { [key: string]: unknown };
export type WorkerType<Job extends string> = { job: Job };

function isObject1(object: unknown): object is Record<string, unknown> {
    return typeof object === "object";
}

function isObject2(object: unknown): object is { [key: string]: unknown } {
    return typeof object === "object";
}

function hasPersonProps(object: UnknownObject): boolean {
    return typeof object.name === "string" && typeof object.age === "number";
}

export function isPerson1(object: unknown): object is Person {
    if (!isObject1(object)) {
        return false;
    }
    return hasPersonProps(object);
}

export function isPerson2(object: unknown): object is Person {
    if (!isObject2(object)) {
        return false;
    }
    return hasPersonProps(object);
}

const obj: UnknownObject = {
    prop1: "hello",
    prop2: "world",
    prop3: 123,
    func: () => 55,
};
