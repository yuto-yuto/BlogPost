export { };

import * as fs from "fs";
import * as Path from "path";

interface FileOrDirectory {
    path: string;
    isDirectory: boolean;
    children: FileOrDirectory[];
}

async function readDirByIterativeCall(path: string, filter?: string): Promise<FileOrDirectory[]> {
    const entries = await fs.promises.readdir(path)

    const directoryDict = new Map<number, FileOrDirectory>();
    const result: FileOrDirectory[] = [];

    const queue: { parentId: number, parentPath: string, entry: string }[] = [];
    let directoryId = 0;

    for (const entry of entries) {
        queue.push({ parentId: 0, parentPath: path, entry });
    }

    while (queue.length > 0) {
        const element = queue.shift()!;

        const absolutePath = Path.join(element.parentPath, element.entry);

        if (filter) {
            const regex = new RegExp(filter);
            if (!regex.test(absolutePath)) {
                continue;
            }
        }

        const addedEntry: FileOrDirectory = {
            path: element.entry,
            isDirectory: fs.lstatSync(absolutePath).isDirectory(),
            children: [],
        };

        if (addedEntry.isDirectory) {
            directoryId++;

            const childEntries = await fs.promises.readdir(absolutePath);
            for (const entry of childEntries) {
                queue.push({ parentId: directoryId, parentPath: absolutePath, entry });
            }

            directoryDict.set(directoryId, addedEntry);
        }

        if (element.parentId === 0) {
            result.push(addedEntry);
        } else {
            const parentEntry = directoryDict.get(element.parentId);
            if (!parentEntry) {
                throw new Error(`parent ID doesn't exist in the directoryDict. [${element.parentId}]`);
            }
            parentEntry.children.push(addedEntry);
        }
    }

    return result;
}

async function readDirByRecursiveCall(path: string, filter?: string): Promise<FileOrDirectory[]> {
    const entries = await fs.promises.readdir(path)

    const result: FileOrDirectory[] = [];

    for (const entry of entries) {
        const absolutePath = Path.join(path, entry);

        if (filter) {
            const regex = new RegExp(filter);
            if (!regex.test(absolutePath)) {
                continue;
            }
        }

        const addedEntry: FileOrDirectory = {
            path: entry,
            isDirectory: fs.lstatSync(absolutePath).isDirectory(),
            children: [],
        };

        if (addedEntry.isDirectory) {
            addedEntry.children = await readDirByRecursiveCall(absolutePath);
        }

        result.push(addedEntry);
    }

    return result;
}

function showItem(item: FileOrDirectory, depth: number): string {
    if (item.isDirectory) {
        const result = [];
        result.push(" ".repeat(depth * 2) + item.path + "\n");

        if (item.children.length === 0) {
            return " ".repeat(depth * 2) + "empty\n";
        }

        for (const child of item.children) {
            result.push(showItem(child, depth + 1));
        }
        return result.join("");
    } else {
        return " ".repeat(depth * 2) + item.path + "\n";
    }
}

async function run() {
    {
        console.log("----- readDirByIterativeCall -----")
        const items = await readDirByIterativeCall("D:/temp/test");
        const msg = items.map((v) => showItem(v, 0)).join("");
        console.log(msg);
    }
    {
        console.log("----- readDirByIterativeCall with filter-----")
        const items = await readDirByIterativeCall("D:/temp/test", "secondDir");
        const msg = items.map((v) => showItem(v, 0)).join("");
        console.log(msg);
    }

    {
        console.log("----- readDirByRecursiveCall -----")
        const items = await readDirByRecursiveCall("D:/temp/test");
        const msg = items.map((v) => showItem(v, 0)).join("");
        console.log(msg);
    }
    {
        console.log("----- readDirByRecursiveCall with filter-----")
        const items = await readDirByRecursiveCall("D:/temp/test", "secondDir");
        const msg = items.map((v) => showItem(v, 0)).join("");
        console.log(msg);
    }
}

run().then();