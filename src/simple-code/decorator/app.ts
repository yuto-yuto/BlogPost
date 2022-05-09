import "reflect-metadata";
import { first, log, notEmpty, restrictTo, second, starFrame, validate, validateString } from "./decorators";

class ExampleClass {
    @first()
    @second()
    public method() {
        console.log("method is called.");
        return 1;
    }

    @log
    public asyncMethod() {
        console.log("asyncMethod is called");
        return new Promise((resolve) => global.setTimeout(() => resolve(50), 2000));
    }

    @log
    public syncMethod() {
        console.log("syncMethod is called");
        return 11;
    }

    @validateString
    public testEmptyString(
        @notEmpty value1: string,
        value2: string,
        @notEmpty value3: string,
    ) { }

    @validate
    public testRestriction(
        @restrictTo([99, 45, 12]) value1: number,
        @restrictTo(["hello", "foo"]) value2: string,
        value3: string,
    ) { }

    @starFrame
    public changeReturnedValue(
    ) {
        return "Hello. This is decorator implementation test.";
    }
}

const execute = (action: () => void) => {
    try {
        console.log(action());
    } catch (e) {
        console.error(`=== Error ===> ${(e as Error).message}`);
        console.log();
    }
}

console.log("-----execute------")
const instance = new ExampleClass();
// console.log("method: " + instance.method());
// console.log(instance.syncMethod());
// instance.asyncMethod().then((result) => console.log(`resolved: ${result}`));
// execute(() => instance.testEmptyString("", "", ""));
// execute(() => instance.testEmptyString("111", "", ""));
// execute(() => instance.testEmptyString("999", "", "888"));

// execute(() => instance.testRestriction(99, "hello", "hey"));
// execute(() => instance.testRestriction(45, "foo", "hey"));
// execute(() => instance.testRestriction(45, "not-allowed", "hey"));
// execute(() => instance.testRestriction(46, "hello", "hey"));
// execute(() => instance.testRestriction(46, "not-allowed", "hey"));

console.log(instance.changeReturnedValue());