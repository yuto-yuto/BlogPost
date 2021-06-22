import { commit, Operation, rollback, startTransaction } from "./common";

interface CommandBaseArg { }
interface IdBase extends CommandBaseArg {
    id: string;
}
interface UpdateCommandArgs extends IdBase {
    numberOfStock: number;
}

type InsertCommandArgs = IdBase & {
    name: string;
}

interface DeleteCommandArgsByInterface extends IdBase { }
type DeleteCommandArgsByType = IdBase;

interface DatabaseCommand {
    execute(args: CommandBaseArg): void;
}

class EmptyCommand implements DatabaseCommand {
    public execute(): void {
        // Do nothing.
    }
}

class SearchAllCommand implements DatabaseCommand {
    public execute(): void {
        console.log("Show all items.");
    }
}
class SearchByIdCommand implements DatabaseCommand {
    public execute(args: IdBase): void {
        console.log(`Found an item. {id: ${args.id}}`);
    }
}

class UpdateCommand implements DatabaseCommand {
    public execute(args: UpdateCommandArgs): void {
        console.log(`Updated an item. {id: ${args.id}, numberOfStock: ${args.numberOfStock}}`);
    }
}

class InsertCommand implements DatabaseCommand {
    public execute(args: InsertCommandArgs): void {
        console.log(`Inserted an item. {id: ${args.id}, name: ${args.name}}`);
    }
}

class DeleteCommandByInterface implements DatabaseCommand {
    public execute(args: DeleteCommandArgsByInterface): void {
        console.log(`Deleted an item (interface). {id: ${args.id}}`);
    }
}
class DeleteCommandByType implements DatabaseCommand {
    public execute(args: DeleteCommandArgsByType): void {
        console.log(`Deleted an item (type). {id: ${args.id}}`);
    }
}

function createCommand(command: Operation): DatabaseCommand {
    switch (command) {
        case Operation.SearchById: return new SearchByIdCommand();
        case Operation.SearchAll: return new SearchAllCommand();
        case Operation.Insert: return new InsertCommand();
        case Operation.Update: return new UpdateCommand();
        case Operation.Delete: return new DeleteCommandByInterface();
        default:
            console.error(`Undefined command.`);
            return new EmptyCommand();
    }
}

function run(command: Operation, args: CommandBaseArg) {
    try {
        startTransaction();
        const commandExecutor = createCommand(command);
        commandExecutor.execute(args);
        commit();
    } catch (e) {
        rollback();
    }
}

const args: InsertCommandArgs = {
    id: "product-1",
    name: "first-item",
}
run(Operation.Insert, args);