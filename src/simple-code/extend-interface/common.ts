export enum Operation {
    SearchById = 1,
    SearchAll = 2,
    Insert = 3,
    Update = 4,
    Delete = 5,
}

export function startTransaction(): void {
    console.log("Start transaction.");
}
export function commit(): void {
    console.log("Commit transaction.");
}
export function rollback(): void {
    console.log("Rollback completed.");
}