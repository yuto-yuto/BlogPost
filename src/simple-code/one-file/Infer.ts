export { }

interface ActionExecutorArgs { }
interface Action3ExecutorArgs extends ActionExecutorArgs {
    str: string;
    num: number;
}
abstract class ActionExecutor<T>{
    public execute(args: ActionExecutorArgs): T {
        // Do something here
        return this.action(args);
    }
    protected abstract action(args: ActionExecutorArgs): T;
}

class Action1Executor extends ActionExecutor<number>{
    protected action(): number {
        return 33;
    }
}
class Action2Executor extends ActionExecutor<string>{
    protected action(): string {
        return "SUPER";
    }
}
type Action3ReturnType = { prop1: string, prop2: number };
class Action3Executor extends ActionExecutor<Action3ReturnType>{
    protected action(args: Action3ExecutorArgs): Action3ReturnType {
        return {
            prop1: args.str,
            prop2: args.num,
        };
    }
}
const actions = [
    new Action1Executor(),
    new Action2Executor(),
    new Action3Executor(),
];
actions.forEach((action) => {
    const args = action instanceof Action3Executor ? { str: "HELLO", num: 55 } : {};
    const result = action.execute(args);
    console.log(result);
});
// ===================

function action1(): number {
    return 33;
}

function action2(): string {
    return "SUPER";
}

function action3(str: string, num: number): Action3ReturnType {
    return {
        prop1: str,
        prop2: num,
    };
}
type ActionReturnType = number | string | Action3ReturnType;
function doAction0(action: (...args: any[]) => any, ...args: any[]): any {
    // do something here
    return action(...args);
}
{
    const result = doAction0(action1);
}
function doAction1(action: (...args: any[]) => ActionReturnType, ...args: any[]): ActionReturnType {
    // do something here
    return action(...args);
}
{
    const result = doAction1(action1);
}
function doAction2<T extends (...args: any[]) => any>(action: T, ...args: any[]): ReturnType<T> {
    // do something here
    return action(...args);
}

type Action1Type = ReturnType<typeof action1>;
type Action2Type = ReturnType<typeof action2>;
type Action3Type = ReturnType<typeof action3>;
console.log(doAction2(action1));
console.log(doAction2(action2));
console.log(doAction2(action3, "HELLO", 123));

const resultType1 = doAction2(action1)
const resultType2 = doAction2(action2)
const resultType3 = doAction2(action3, "HELLO", 123)

// ===============================================

type Params = Parameters<typeof action3>;
type Args<T> = T extends (...args: infer A) => any ? A : never;
type Param2 = Args<typeof action3>

// Return type of Promise
type PromiseValue<T> = T extends Promise<infer R> ? R : never;
type Promise1 = Promise<string>;
type Promise1Value = PromiseValue<Promise1>;

// Get value data type in Map
type MapValue<T> = T extends Map<string, infer V> ? V : never;

// ==================================================

function annoyingFunc(param1: number, param2: string, param3 = false, param4?: string, param5?: string) {
    console.log(
        `param1: ${param1}\n`,
        `param2: ${param2}\n`,
        `param3: ${param3}\n`,
        `param4: ${param4}\n`,
        `param5: ${param5}\n`,
    );
}

type AnnoyingFuncParameters = Parameters<typeof annoyingFunc>;

function createFuncArg(args: {
    param1: number,
    param2: string,
    param3?: boolean,
    param4?: string,
    param5?: string,
}): Parameters<typeof annoyingFunc> {
    return [
        args.param1,
        args.param2,
        args.param3 ?? false,
        args.param4 ?? undefined,
        args.param5 ?? undefined,
    ]
}
{
    const args = createFuncArg({
        param1: 1111,
        param2: "HEY",
        param5: "optional string"
    });
    annoyingFunc(...args);
}


function getValueFrom<T, U extends keyof T>(obj: T, key: U): T[U] {
    return obj[key];
}



// const Level = {
//     normal: 1,
//     high: 2,
//     super: 3,
//     admin: 4,
// } as const;
// type LevelType = typeof Level[keyof typeof Level];

// interface UserData {
//     name: string;
//     level: LevelType;
// };

// interface BaseSetting {
//     setting1: number;
//     setting2: number;
//     setting3: number;
// };

// interface HighSetting extends BaseSetting {
//     highSetting: number;
// }
// interface SuperSetting extends HighSetting {
//     highSetting: number;
// }
// interface AdminSetting extends SuperSetting {
//     adminSetting: number;
// }

// type PickSetting<T> = T extends { isAdmin: 1 } ? BaseSetting :
//     T extends { isAdmin: 2 } ? HighSetting :
//     T extends { isAdmin: 3 } ? SuperSetting :
//     T extends { isAdmin: 4 } ? AdminSetting : never;

// function fetchData<T extends UserData>(userData: T): PickSetting<T> {

// }

// type AA = DoSomethingResult<12>;

// function doSomething<T>(param: T): DoSomethingResult<T> {
//     return param;
// }

// interface Person {
//     name: string;
//     age: number;
// }

// interface Product {
//     name: string;
//     price: number;
//     productCode: string;
// }

// function fetch(data: unknown): Promise<unknown> {
//     return new Promise((resolve) => {
//         return global.setTimeout(() => resolve(data), Math.random() * 100);
//     });
// }

// const persons: Person[] = [
//     { name: "Yuto", age: 35 },
//     { name: "Jack", age: 24 },
// ];

// const products: Product[] = [
//     { name: "name-1", price: 20, productCode: "Code_1" },
//     { name: "name-2", price: 15, productCode: "Code_2" },
//     { name: "name-3", price: 33, productCode: "Code_3" },
// ];

// const a = fetch(persons);
