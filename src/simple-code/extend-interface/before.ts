import { commit, Operation, rollback, startTransaction } from "./common";

interface CommandArgs {
    id: number;
    name?: string;
    numberOfStock?: number;
}

function run1(command: Operation, args?: CommandArgs) {
    try {
        startTransaction();
        switch (command) {
            case Operation.SearchAll:
                searchAll();
                break;
            case Operation.SearchById:
                if (!args) {
                    throw new Error("args must be provided for searchById.")
                }
                searchById(args);
                break;
            case Operation.Insert: {
                if (args && args.name) {
                    insert({ id: args.id, name: args.name });
                    break;
                }
                throw new Error("name is required to insert.");
            }
            case Operation.Update: {
                if (args && args.numberOfStock) {
                    update({ id: args.id, numberOfStock: args.numberOfStock });
                    break;
                }
                throw new Error("numberOfStock is required to update.");
            }
            case Operation.Delete: {
                if (!args) {
                    throw new Error("args must be provided to delete.")
                }
                deleteById(args);
                break;
            }
            default:
                throw new Error("Undefined command");
        }
        commit();
    } catch (e) {
        rollback();
    }
}

function run2(command: Operation, args?: CommandArgs) {
    try {
        startTransaction();
        execute();
        commit();
    } catch (e) {
        rollback();
    }

    function execute() {
        switch (command) {
            case Operation.SearchAll:
                searchAll();
                break;
            case Operation.SearchById:
                if (!args) {
                    throw new Error("args must be provided for searchById.")
                }
                searchById(args);
                break;
            case Operation.Insert: {
                if (args && args.name) {
                    insert({ id: args.id, name: args.name });
                    break;
                }
                throw new Error("name is required to insert.");
            }
            case Operation.Update: {
                if (args && args.numberOfStock) {
                    update({ id: args.id, numberOfStock: args.numberOfStock });
                    break;
                }
                throw new Error("numberOfStock is required to update.");
            }
            case Operation.Delete: {
                if (!args) {
                    throw new Error("args must be provided to delete.")
                }
                deleteById(args);
                break;
            }
            default:
                throw new Error("Undefined command");
        }
    }
}

function searchAll(): void {
    console.log("Show all items.");
}
function searchById(args: { id: number }): void {
    console.log(`Found an item. {id: ${args.id}}`);
}

function update(args: { id: number, numberOfStock: number }): void {
    console.log(`Updated an item. {id: ${args.id}, numberOfStock: ${args.numberOfStock}}`);
}

function insert(args: { id: number, name: string }): void {
    console.log(`Inserted an item. {id: ${args.id}, name: ${args.name}}`);
}

function deleteById(args: { id: number }): void {
    console.log(`Deleted an item (interface). {id: ${args.id}}`);
}