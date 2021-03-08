import { Initial, Interrupted, Running, SenderCallback, Undefined } from "./Emittable";
import { Key } from "./Key";
import { State } from "./State";
import { InterruptedToInitial, KeepState, RunningToInitial } from "./StateTransition";

export class Context {
    private emittable = new Undefined();
    private transition = new KeepState(this.emittable);
    private lastState?: State;
    private isCount1Updatable = false;
    private count1 = 0;

    public store(key: string, value: number | boolean) {
        if (this.isCount1Updatable && key === Key.Count1) {
            this.count1 = value as number;
        }
        const result = this.transition.compute({
            count1: this.count1,
            key,
            value,
        });
        this.emittable = result.emittable;
        this.transition = result.transition;
    }

    public emit(callback: SenderCallback) {
        this.emittable.emit(callback);
        this.emittable = this.emittable.nextState;
    }

    public updateState(current: State): void {
        if (!this.lastState) {
            this.lastState = current;
            this.isCount1Updatable = true;
            this.emittable = getInitialEmittable();
            this.transition = new KeepState(this.emittable);
            return;
        }

        this.isCount1Updatable = false;

        if (this.isInitialToRunning(current)) {
            this.lastState = current;
            this.isCount1Updatable = true;
            this.emittable = new Running();
            this.transition = new KeepState(this.emittable);
            return;
        }
        if (this.isRunningToInterrupted(current)) {
            this.lastState = current;
            this.emittable = new Interrupted();
            this.transition = new KeepState(this.emittable);
            return;
        }
        if (this.isInterruptedToRunning(current)) {
            this.lastState = current;
            this.emittable = new Running();
            this.transition = new KeepState(this.emittable);
            return;
        }
        if (this.isRunningToInitial(current)) {
            this.lastState = current;
            this.emittable = new Undefined();
            this.transition = new RunningToInitial(this.emittable);
            return;
        }
        if (this.isInterruptedToInitial(current)) {
            this.lastState = current;
            this.emittable = new Undefined();
            this.transition = new InterruptedToInitial(this.emittable);
            return;
        }

        function getInitialEmittable() {
            if (current === State.Initial) {
                return new Initial();
            }
            if (current === State.Running) {
                return new Running();
            }
            if (current === State.Interrupted) {
                return new Interrupted();
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
