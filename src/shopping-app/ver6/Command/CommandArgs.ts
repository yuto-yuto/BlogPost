export interface CommandArgs { }

export interface AddCommandArgs extends CommandArgs {
    itemName: string;
    numberOfItems: number;
}
export interface RemoveCommandArgs extends AddCommandArgs { }