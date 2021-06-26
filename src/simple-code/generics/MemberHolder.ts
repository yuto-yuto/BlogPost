import { DataHolder } from "./DataHolder";

interface Person {
    name: string;
    employeeId: number;
    isFired: boolean;
};

class MemberHolder extends DataHolder<Person, number>{
    protected isAdded(receivedItem: Person): boolean {
        return !receivedItem.isFired
            && !this.currentItems.has(this.getId(receivedItem));
    }
    protected isDeleted(receivedItems: Person[], currentItem: Person): boolean {
        return !receivedItems.some((item) =>
            !item.isFired &&
            this.getId(item) === this.getId(currentItem));
    }
    protected getId(item: Person): number {
        return item.employeeId;
    }
}

const holder = new MemberHolder();
const members = {
    yuto: { name: "yuto", employeeId: 1, isFired: false },
    john: { name: "john", employeeId: 2, isFired: false },
    ralph: { name: "ralph", employeeId: 3, isFired: false },
    gon: { name: "gon", employeeId: 4, isFired: true },
};

console.log(holder.process([members.yuto, members.john]));
// {
//     addedItems: [
//       { name: 'yuto', employeeId: 1, isFired: false },
//       { name: 'john', employeeId: 2, isFired: false }
//     ],
//     deletedItems: []
// }
console.log(holder.process([members.yuto, members.john, members.gon]));
// { addedItems: [], deletedItems: [] }
console.log(holder.process([members.ralph, members.john, members.gon]));
// {
//     addedItems: [ { name: 'ralph', employeeId: 3, isFired: false } ],
//     deletedItems: [ { name: 'yuto', employeeId: 1, isFired: false } ]
// }