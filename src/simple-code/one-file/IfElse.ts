interface InputArgs {
    text: string;
}

const obj1 = { text: "C" };
const obj2 = { text: "H" };

function getCorrespondingData(args: InputArgs): number {
    if (args.text === "A") { return 1; }
    else if (args.text === "B") { return 2; }
    else if (args.text === "C") { return 3; }
    else if (args.text === "D") { return 4; }
    else if (args.text === "E") { return 5; }
    else if (args.text === "F") { return 6; }
    else return -1;
}

console.log(getCorrespondingData(obj1));
console.log(getCorrespondingData(obj2));

function getCorrespondingData2(args: InputArgs): number {
    const map = new Map([
        ["A", 1],
        ["B", 2],
        ["C", 3],
        ["D", 4],
        ["E", 5],
        ["F", 6],
    ]);
    return map.get(args.text) ?? -1;
}

console.log(getCorrespondingData2(obj1));
console.log(getCorrespondingData2(obj2));

// ------------------
interface Linker {
    getData(): number;
}

interface StringLinker extends Linker {
    fulfilled(args: InputArgs): boolean;
}

class ALinker implements StringLinker {
    fulfilled(args: InputArgs): boolean {
        return args.text === "A";
    }
    getData(): number {
        return 1;
    }
}
class BLinker implements StringLinker {
    fulfilled(args: InputArgs): boolean {
        return args.text === "B";
    }
    getData(): number {
        return 2;
    }
}
class CLinker implements StringLinker {
    fulfilled(args: InputArgs): boolean {
        return args.text === "C";
    }
    getData(): number {
        return 3;
    }
}
class DLinker implements StringLinker {
    fulfilled(args: InputArgs): boolean {
        return args.text === "D";
    }
    getData(): number {
        return 4;
    }
}
class ELinker implements StringLinker {
    fulfilled(args: InputArgs): boolean {
        return args.text === "E";
    }
    getData(): number {
        return 5;
    }
}
class FLinker implements StringLinker {
    fulfilled(args: InputArgs): boolean {
        return args.text === "F";
    }
    getData(): number {
        return 6;
    }
}
class NoLinker implements Linker {
    getData(): number {
        return -1;
    }
}

function getCorrespondingData3(args: InputArgs): number {
    const linkerMap: Map<string, Linker> = new Map([
        ["A", new ALinker()],
        ["B", new BLinker()],
        ["C", new CLinker()],
        ["D", new DLinker()],
        ["E", new ELinker()],
        ["F", new FLinker()],
    ]);
    const linker = linkerMap.get(args.text) ?? new NoLinker();
    return linker.getData();
}

function getCorrespondingData4(args: InputArgs): number {
    const linkers = [
        new ALinker(),
        new BLinker(),
        new CLinker(),
        new DLinker(),
        new ELinker(),
        new FLinker(),
    ];
    for (const linker of linkers) {
        if (linker.fulfilled(args)) {
            return linker.getData();
        }
    }
    return new NoLinker().getData();
}

// ======================================

abstract class LinkerBase {
    private next?: LinkerBase;

    public setNext(next: LinkerBase): LinkerBase {
        this.next = next;
        return next;
    }

    public getData(args: InputArgs): number {
        if (this.fulfilled(args)) {
            return this.getValue();
        } else if (this.next) {
            return this.next.getData(args);
        }
        return -1;
    }
    protected abstract getValue(): number;
    protected abstract fulfilled(args: InputArgs): boolean;
}

class ALinkerEx extends LinkerBase {
    protected getValue(): number {
        return 1;
    }
    protected fulfilled(args: InputArgs): boolean {
        return args.text === "A";
    };
}

class BLinkerEx extends LinkerBase {
    protected getValue(): number {
        return 2;
    }
    protected fulfilled(args: InputArgs): boolean {
        return args.text === "B";
    };
}

class CLinkerEx extends LinkerBase {
    protected getValue(): number {
        return 3;
    }
    protected fulfilled(args: InputArgs): boolean {
        return args.text === "C";
    };
}

class DLinkerEx extends LinkerBase {
    protected getValue(): number {
        return 4;
    }
    protected fulfilled(args: InputArgs): boolean {
        return args.text === "D";
    };
}

class ELinkerEx extends LinkerBase {
    protected getValue(): number {
        return 5;
    }
    protected fulfilled(args: InputArgs): boolean {
        return args.text === "E";
    };
}

class FLinkerEx extends LinkerBase {
    protected getValue(): number {
        return 6;
    }
    protected fulfilled(args: InputArgs): boolean {
        return args.text === "F";
    };
}

function getCorrespondingData5(args: InputArgs): number {
    const linker = new ALinkerEx();
    linker.setNext(new BLinkerEx())
        .setNext(new CLinkerEx())
        .setNext(new DLinkerEx())
        .setNext(new ELinkerEx())
        .setNext(new FLinkerEx());

    return linker.getData(args);
}

console.log(getCorrespondingData5({ text: "D" }))
console.log(getCorrespondingData5({ text: "H" }))