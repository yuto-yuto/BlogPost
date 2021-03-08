import { State } from "./State";

export type SenderCallback = (state: State) => void;
const interval = 10;

export interface Emittable {
    emit(callback: SenderCallback): void;
    nextState: Emittable;
}

export class Undefined implements Emittable {
    public emit(callback: SenderCallback): void {
        callback(State.Undefined);
    }
    public get nextState(): Emittable {
        return this;
    }
}

export class Initial implements Emittable {
    public emit(callback: SenderCallback): void {
        callback(State.Initial);
    }
    public get nextState(): Emittable {
        return this;
    }
}

export class Running implements Emittable {
    public emit(callback: SenderCallback): void {
        callback(State.Running);
    }
    public get nextState(): Emittable {
        return this;
    }
}

export class Aborted implements Emittable {
    public emit(callback: SenderCallback): void {
        callback(State.Aborted);
        setTimeout(() => {
            callback(State.Initial);
        }, interval);
    }
    public get nextState(): Emittable {
        return new Initial();
    }
}

export class Ended implements Emittable {
    public emit(callback: SenderCallback): void {
        callback(State.Ended);
        setTimeout(() => {
            callback(State.Initial);
        }, interval);
    }
    public get nextState(): Emittable {
        return new Initial();
    }
}

export class DummyRunning implements Emittable {
    public emit(callback: SenderCallback): void {
        callback(State.Running);
        setTimeout(() => {
            callback(State.Ended);
            setTimeout(() => {
                callback(State.Initial);
            }, interval);
        }, interval);
    }
    public get nextState(): Emittable {
        return new Initial();
    }
}

export class Interrupted implements Emittable {
    public emit(callback: SenderCallback): void {
        callback(State.Interrupted);
    }
    public get nextState(): Emittable {
        return this;
    }
}
