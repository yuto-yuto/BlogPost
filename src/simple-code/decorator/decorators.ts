import 'reflect-metadata';

export const MyDecorators = {
    Restriction: "RESTRICTION",
    NotEmpty: "NOT_EMPTY",
} as const;
export type ValidDecorators = typeof MyDecorators[keyof typeof MyDecorators];

export function first(): MethodDecorator {
    console.log("first(): factory evaluated");
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        console.log("first(): called");
        console.log(`target: ${JSON.stringify(target, null, 2)}`);
        console.log(`name: ${target.constructor.name}`);
        console.log(`propertyKey: ${propertyKey.toString()}`);
        console.log(descriptor);
    };
}

export function second(): MethodDecorator {
    console.log("second(): factory evaluated");
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        console.log("second(): called");
    };
}

export function log(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const key = `${target.constructor.name}${propertyKey}`;
        console.log(`start: ${key}`);
        console.time(key);
        const result = originalMethod.apply(this, args);
        if (isPromise(result)) {
            return result.then((x: unknown) => {
                console.timeEnd(key);
                return x;
            });
        }
        console.timeEnd(key);
        return result;
    }
}
function isPromise(object: unknown): boolean {
    return Object.prototype.hasOwnProperty.call(object, "then") &&
        Object.prototype.hasOwnProperty.call(object, "catch");
}

export function notEmpty(target: any, propertyKey: string, index: number): void {
    const list = Reflect.getOwnMetadata(MyDecorators.NotEmpty, target, propertyKey);
    console.log(target);
    console.log(`propertyKey: ${propertyKey}`);
    console.log(`index: ${index}`);
    if (list) {
        list.push(index);
    } else {
        Reflect.defineMetadata(MyDecorators.NotEmpty, [index], target, propertyKey);
    }
}


export function validateString(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
    const list: number[] = Reflect.getOwnMetadata(MyDecorators.NotEmpty, target, propertyKey);
    console.log("-------validateString");
    console.log(list);

    if (!list) {
        return;
    }

    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any) {
        // list contains indexes of the args which has a parameter decorator
        const invalid = list.filter((index) => {
            const currentArg = args[index];
            console.log(`current arg value: '${currentArg}'`)
            return currentArg.trim() === "";
        });

        if (invalid.length > 0) {
            throw new Error(`Empty string detected!`);
        }
        // Execute original method
        Reflect.apply(originalMethod, this, args);
    }
}

export interface Restriction<T> {
    index: number;
    validList: T[];
}

export function restrictTo<T>(validList: T[]): ParameterDecorator {
    return (target: any, propertyKey: string | symbol, index: number) => {
        const list = Reflect.getOwnMetadata(MyDecorators.Restriction, target, propertyKey);
        console.log("------------restrict")
        console.log(MyDecorators.Restriction)
        console.log(target);
        console.log(propertyKey);
        console.log(list);
        console.log(`index: ${index}`);
        const obj = {
            index,
            validList,
        };
        if (list) {
            list.push(obj);
        } else {
            Reflect.defineMetadata(MyDecorators.Restriction, [obj], target, propertyKey);
        }
    };
}

export function validate(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
    const list: Restriction<string | number>[] = Reflect.getOwnMetadata(MyDecorators.Restriction, target, propertyKey);
    if (!list) {
        return;
    }
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any) {
        const invalid = list
            .filter((obj) => {
                const currentArg = args[obj.index];
                return !obj.validList.includes(currentArg);
            }).map((x) => args[x.index]);

        if (invalid.length > 0) {
            throw new Error(`Invalid values detected! [${invalid.join(", ")}]`);
        }

        Reflect.apply(originalMethod, this, args);
    }
}

export function starFrame(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any) {
        const result = Reflect.apply(originalMethod, this, args);
        if (typeof result === "string") {
            const top = "*".repeat(result.length + 4);
            const middle = `* ${result} *`;
            const bottom = "*".repeat(result.length + 4);
            return `${top}\n${middle}\n${bottom}`;

        }
        return result;
    };
}