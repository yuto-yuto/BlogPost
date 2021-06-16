// {
//     const map = new Map<string, number>();
//     const one = 1;
//     let two = 2;
//     const three = 3;
//     map.set("one", one)
//         .set("two", two)
//         .set("three", three);
//     console.log(`size: ${map.size}`);
//     console.log(map);
//     console.log("before update: " + map.get("two"));
//     two = 16;
//     console.log("after update: " + map.get("two"));
//     console.log("----------");
// }
// type Person = { name: string, age: number };
// {
//     const hoge: Person = { name: "hoge", age: 12 };
//     const foo: Person = { name: "foo", age: 22 };
//     const map = new Map<string, Person>();
//     map.set("hoge", hoge);

//     console.log(`size: ${map.size}`);
//     console.log(map.get("hoge"));
//     hoge.name = "Updated hoge";
//     console.log(map.get("hoge"));

//     map.set("foo", { ...foo })
//     console.log(map.get("foo"));
//     foo.name = "updated foo";
//     console.log(map.get("foo"));
//     console.log("----------");
// }
// {
//     let hoge = { name: "hoge", age: 12, deep: { value: 99 } };
//     const map = new Map<string, Person>();
//     map.set("hoge", { ...hoge });
//     hoge.deep.value = 1;
//     console.log(map.get("hoge"));
//     console.log("----------hoge");
// }
// {
//     const map = new Map([
//         [0, "Initializing"],
//         [1, "Idle"],
//         [2, "Running"],
//         [3, "Stop"],
//         [4, "Error"],
//     ]);
//     getStatus(0);
//     getStatus(3);
//     getStatus(5);
//     console.log("----------");

//     function getStatusBySwitch(value: number) {
//         switch (value) {
//             case 0: return "Initializing";
//             case 1: return "Idle";
//             case 2: return "Running";
//             case 3: return "Stop";
//             case 4: return "Error";
//             default: return "Undefined";
//         }
//     }
//     function getStatus(value: number) {
//         console.log(`${getStatusBySwitch(value)}, ${map.get(value)}`);
//     }
// }
// {
//     const map = new Map([
//         ["Desk", 44],
//         ["Chair", 23],
//         ["Light", 36],
//         ["Mat", 97],
//     ]);
//     map.forEach((value: number, key: string) => {
//         console.log(`${key}: ${value}`);
//     });
//     const sum = Array.from(map.values()).reduce((acc, cur) => acc + cur);
//     const ave = sum / map.size;
//     console.log(`sum: ${sum}, ave: ${ave}`);
//     const joinedKeys = Array.from(map.keys()).join(",");
//     console.log(joinedKeys);
// }

// {
//     const groups = new Map<number, Person[]>();
//     const people1: Person[] = [
//         { name: "Steve", age: 34 },
//         { name: "Joe", age: 42 },
//     ];
//     const people2: Person[] = [
//         { name: "Frank", age: 63 },
//         { name: "Kevin", age: 21 },
//         { name: "Luisa", age: 29 },
//     ];
//     groups.set(1, people1)
//     groups.set(2, people2);
//     people2.shift();
//     console.log(groups.get(2));
// }

import { performance } from "perf_hooks";
{
    const statusMap = new Map([
        [0, "Initializing"],
        [1, "Idle"],
        [2, "Running"],
        [3, "Stop"],
        [4, "Error"],
    ]);
    function getStatusByMap(value: number) {
        return statusMap.get(value);
    }
    function getStatusBySwitch(value: number) {
        switch (value) {
            case 0: return "Initializing";
            case 1: return "Idle";
            case 2: return "Running";
            case 3: return "Stop";
            case 4: return "Error";
            default: return "Undefined";
        }
    }
    function getStatusByIfElse(value: number) {
        if (value === 0) {
            return "Initializing";
        } else if (value === 1) {
            return "Idle";
        } else if (value === 2) {
            return "Running";
        } else if (value === 3) {
            return "Stop";
        } else if (value === 4) {
            return "Error";
        }
    }
    function measure(cb: (value: number) => void) {
        const start = performance.now();
        for (let i = 0; i < 100000; i++) {
            const val = i % 5;
            cb(val);
        }
        const end = performance.now();
        console.log(`${cb.name}: ${end - start}`);
    }
    measure(getStatusByMap);
    measure(getStatusByIfElse);
    measure(getStatusBySwitch);
}
