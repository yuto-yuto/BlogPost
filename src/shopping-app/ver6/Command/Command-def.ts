export enum CommandName {
    List = "list",
    Add = "add",
    Remove = "remove",
    Cart = "cart",
    Pay = "pay",
    Command = "command",
    Exit = "exit",
}

export interface Command {
    execute(args?: string[]): void;
}

export interface CommandArgs { }