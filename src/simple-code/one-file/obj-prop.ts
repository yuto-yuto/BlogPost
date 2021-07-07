{
    interface MyType {
        value: number;
        foo: {
            value: string;
        };
    }

    const obj: MyType = {
        value: 1,
        foo: { value: "value" },
    };

    {
        const key = "foo";
        console.log(obj[key]); // OK
        const key2: string = "foo";
        // console.log(obj[key2]); // NG
        // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'MyType'.
        // No index signature with a parameter of type 'string' was found on type 'MyType'.ts(7053)
    }

    function disp(key: string) {
        // console.log(obj[key]);      // NG
        console.log(obj["foo"]);    // OK
    }

    function disp2(key: keyof MyType) {
        console.log(obj[key]);      // OK
        console.log(obj["foo"]);    // OK
    }
}

{
    function isObject(object: unknown): object is Object {
        return object !== null && typeof object === "object";
    }

    function getValueOf(object: any, prop: string): unknown {
        return object[prop];
    }

    function getValueOf1(object: unknown, prop: string): unknown {
        const found = Object.prototype.hasOwnProperty.call(object, prop);
        if (found) {
            // return object[prop]; // Object is of type 'unknown'.ts(2571)
        }
        return undefined;
    }

    function getValueOf2(object: unknown, prop: string): unknown {
        if (!isObject(object)) {
            return object;
        }

        const found = Object.prototype.hasOwnProperty.call(object, prop);
        if (found) {
            // return object[prop];
            // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Object'.
            // No index signature with a parameter of type 'string' was found on type 'Object'.ts(7053)
        }
        return undefined;
    }

    function isMyObject(object: unknown): object is MyObject {
        return object !== null && typeof object === "object";
    }
    interface MyObject {
        [key: string]: unknown;
    }
    function getValueOf3(object: unknown, prop: string): unknown {
        if (!isMyObject(object)) {
            return object;
        }

        const found = object.hasOwnProperty(prop);

        if (found) {
            return object[prop];
        }
        return undefined;
    }
}

{
    interface MyType {
        value: number;
        foo: {
            value: string;
        };
    }

    const obj: MyType = {
        value: 1,
        foo: { value: "value" },
    };

    function getValueOf<T>(object: T, key: string): T[keyof T] | undefined {
        if (isKeyOf(object, key)) {
            return object[key];
        }
        return undefined;
    }

    function isKeyOf<T>(object: T, key: any): key is keyof T {
        return key in object
    }
    console.log(getValueOf(obj, "foo"));
}