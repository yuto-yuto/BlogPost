import { SenderCallback } from "./Emitter";
import { Key } from "./Key";
import { State } from "./State";

export class FirstContext {
    private map = new Map<string, number | boolean>();
    private emitter = State.Undefined;
    private lastState?: State;
    private currentState?: State;

    private isCount1Updatable = false;
    private count1 = 0;
    private interval = 10;

    public store(key: string, value: number | boolean): void {
        this.map.set(key, value);
        if (this.isCount1Updatable && key === Key.Count1) {
            this.count1 = value as number;
            this.isCount1Updatable = false;
            return;
        }

        const count2 = this.map.get(Key.Count2);
        const count3 = this.map.get(Key.Count3);
        const flag = this.map.get(Key.Flag);

        if (count2 === undefined ||
            count3 === undefined ||
            flag === undefined
        ) {
            return;
        }

        this.map.clear();
        if (this.currentState === State.InterruptedToInitial) {
            if (this.count1 === count2 && flag === false) {
                this.emitter = State.DummyRunning;
                return;
            }
            this.emitter = State.Aborted;
            return;

        } else if (this.currentState === State.RunningToInitial) {
            if (this.count1 === count2 && count3 === 0) {
                this.emitter = State.Ended;
                return;
            }
            this.emitter = State.Aborted;
            return;
        }
    }

    public emit(callback: SenderCallback) {
        if (this.emitter === State.DummyRunning) {
            callback(State.Running);
            setTimeout(() => {
                callback(State.Ended);
                setTimeout(() => {
                    callback(State.Initial);
                }, this.interval);
            }, this.interval);
        } else if (this.emitter === State.Aborted) {
            callback(this.emitter);
            setTimeout(() => {
                callback(State.Initial);
            }, this.interval);
        } else if (this.emitter === State.Ended) {
            callback(this.emitter);
            setTimeout(() => {
                callback(State.Initial);
            }, this.interval);
        } else {
            callback(this.emitter);
        }
    }

    public updateState(current: State): void {
        if (!this.lastState) {
            this.lastState = current;
            this.isCount1Updatable = true;
            this.emitter = getInitialValue();
            return;
        }

        this.isCount1Updatable = false;

        if (this.isInitialToRunning(current)) {
            this.lastState = current;
            this.isCount1Updatable = true;
            this.emitter = State.Running;
            return;
        }
        if (this.isRunningToInterrupted(current)) {
            this.lastState = current;
            this.emitter = State.Interrupted;
            return;
        }
        if (this.isInterruptedToRunning(current)) {
            this.lastState = current;
            this.emitter = State.Running;
            return;
        }
        if (this.isRunningToInitial(current)) {
            this.lastState = current;
            this.emitter = State.Undefined;
            this.currentState = State.RunningToInitial;
            return;
        }
        if (this.isInterruptedToInitial(current)) {
            this.lastState = current;
            this.emitter = State.Undefined;
            this.currentState = State.InterruptedToInitial;
            return;
        }

        function getInitialValue() {
            if (current === State.Initial) {
                return State.Initial;
            }
            if (current === State.Running) {
                return State.Running;
            }
            if (current === State.Interrupted) {
                return State.Interrupted;
            }
            throw new Error(`Undefined state: ${current}`);
        }
    }

    private isInitialToRunning(current: State) {
        return this.lastState === State.Initial
            && current === State.Running;
    }
    private isRunningToInterrupted(current: State) {
        return this.lastState === State.Running
            && current === State.Interrupted;
    }
    private isInterruptedToRunning(current: State) {
        return this.lastState === State.Interrupted
            && current === State.Running;
    }
    private isInterruptedToInitial(current: State) {
        return this.lastState === State.Interrupted
            && current === State.Initial;
    }
    private isRunningToInitial(current: State) {
        return this.lastState === State.Running
            && current === State.Initial;
    }
}
