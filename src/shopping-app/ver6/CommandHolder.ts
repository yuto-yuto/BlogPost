import { Command, CommandName, DisplayCommand } from "./Command";

export class CommandHolder {
    private commands: Map<CommandName, Command>;
    constructor() {
        this.commands = new Map([
            [CommandName.Command, new DisplayCommand()],
        ]);
    }
    public getCommand(name: CommandName): Command {
        const result = this.commands.get(name);
        if (!result) {
            throw new Error(`Specified command is undefined. [${name}]`);
        }
        return result;
    };
}