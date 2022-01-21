export { };

function getStatusCode(value: string) {
    switch (value) {
        case "running": return 1;
        case "stop": return 2;
        case "aborted": return 3;
        case "finished": return 4;
        default: throw new Error(`Unexpected value [${value}]`);
    }
}

const Status = {
    Running: "running",
    Stop: "stop",
    Aborted: "aborted",
    Finished: "finished",
} as const;
// type StatusType = "running" | "stop" | "aborted" | "finished"
type StatusType = typeof Status[keyof typeof Status];

function getStatusCode2(value: string) {
    switch (value) {
        case Status.Running: return 1;
        case Status.Stop: return 2;
        case Status.Aborted: return 3;
        case Status.Finished: return 4;
        default: throw new Error(`Unexpected value [${value}]`);
    }
}

const StatusMapObj = {
    [Status.Running]: 1,
    [Status.Stop]: 2,
    [Status.Aborted]: 3,
    [Status.Finished]: 4,
    [Status.Finished]: 5,
} as const;

const StatusMapObj2 = {
    running: 1,
    stop: 2,
    aborted: 3,
    finished: 4,
    // An object literal cannot have multiple properties with the same name in strict mode.ts(1117)
    // Duplicate identifier 'finished'.ts(2300)
    // finished: 5,
} as const;

const StatusMap = new Map<StatusType, number>([
    [Status.Running, 1],
    [Status.Stop, 2],
    [Status.Aborted, 3],
    [Status.Finished, 4],
    [Status.Finished, 5],
]);

const StatusMap2 = new Map<StatusType, number>([
    ["running", 1],
    ["stop", 2],
    ["aborted", 3],
    ["finished", 4],
    ["finished", 5],
]);

const StatusMapRecord: Record<StatusType, number> = {
    running: 1,
    stop: 2,
    aborted: 3,
    finished: 4,
    // Duplicate identifier 'finished'
    // finished: 5,
} as const;

function selectBySwitch(value: StatusType) {
    switch (value) {
        case Status.Running: return 1;
        case Status.Stop: return 2;
        case Status.Aborted: return 3;
        case Status.Finished: return 4;
        default:
            const check: never = value;
            throw new Error("Add the new value");
    }
}

console.log(selectBySwitch(Status.Running));
console.log(StatusMap.get(Status.Running));
console.log(StatusMapObj[Status.Running]);
console.log(StatusMapRecord[Status.Running]);

function selectByStatusMapObj(value: string) {
    const result = StatusMapObj[value as StatusType];
    if (result === undefined) {
        throw new Error(`Unexpected value [${value}]`);
    }
    return result;
}

function selectByStatusMap(value: string) {
    const result = StatusMap.get(value as StatusType);
    if (result === undefined) {
        throw new Error(`Unexpected value [${value}]`);
    }
    return result;
}

function selectByStatusMapRecord(value: string) {
    const result = StatusMapRecord[value as StatusType];
    if (result === undefined) {
        throw new Error(`Unexpected value [${value}]`);
    }
    return result;
}


