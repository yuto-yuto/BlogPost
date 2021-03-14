import { State } from "./State";

export type SenderCallback = (state: State) => void;
const interval = 10;

export interface Emitter {
    emit(callback: SenderCallback): void;
    nextState: Emitter;
}

export class Undefined implements Emitter {
    public emit(callback: SenderCallback): void {
        callback(State.Undefined);
    }
    public get nextState(): Emitter {
        return this;
    }
}

export class Initial implements Emitter {
    public emit(callback: SenderCallback): void {
        callback(State.Initial);
    }
    public get nextState(): Emitter {
        return this;
    }
}

export class Running implements Emitter {
    public emit(callback: SenderCallback): void {
        callback(State.Running);
    }
    public get nextState(): Emitter {
        return this;
    }
}

export class Aborted implements Emitter {
    public emit(callback: SenderCallback): void {
        callback(State.Aborted);
        setTimeout(() => {
            callback(State.Initial);
        }, interval);
    }
    public get nextState(): Emitter {
        return new Initial();
    }
}

export class Ended implements Emitter {
    public emit(callback: SenderCallback): void {
        callback(State.Ended);
        setTimeout(() => {
            callback(State.Initial);
        }, interval);
    }
    public get nextState(): Emitter {
        return new Initial();
    }
}

export class DummyRunning implements Emitter {
    public emit(callback: SenderCallback): void {
        callback(State.Running);
        setTimeout(() => {
            callback(State.Ended);
            setTimeout(() => {
                callback(State.Initial);
            }, interval);
        }, interval);
    }
    public get nextState(): Emitter {
        return new Initial();
    }
}

export class Interrupted implements Emitter {
    public emit(callback: SenderCallback): void {
        callback(State.Interrupted);
    }
    public get nextState(): Emitter {
        return this;
    }
}
