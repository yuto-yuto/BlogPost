interface CommandBaseArg { }
interface IdBase extends CommandBaseArg {
    id: string;
}
type InsertCommandArgs = IdBase & {
    name: string;
    id: number;
}
// let tes: InsertCommandArgs = { name: "123", id: 1 } 

// interface ErrorExtend extends IdBase {
//     id: number;
// }