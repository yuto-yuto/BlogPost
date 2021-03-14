import { Initial, Interrupted, Running, SenderCallback, Undefined } from "./Emitter";
import { Key } from "./Key";
import { State } from "./State";
import { InterruptedToInitial, KeepState, RunningToInitial } from "./StateTransition";

export class Context {
    private emitter = new Undefined();
    private transition = new KeepState(this.emitter);
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
        this.emitter = result.emitter;
        this.transition = result.transition;
    }

    public emit(callback: SenderCallback) {
        this.emitter.emit(callback);
        this.emitter = this.emitter.nextState;
    }

    public updateState(current: State): void {
        if (!this.lastState) {
            this.lastState = current;
            this.isCount1Updatable = true;
            this.emitter = getInitialEmitter();
            this.transition = new KeepState(this.emitter);
            return;
        }

        this.isCount1Updatable = false;

        if (this.isInitialToRunning(current)) {
            this.lastState = current;
            this.isCount1Updatable = true;
            this.emitter = new Running();
            this.transition = new KeepState(this.emitter);
            return;
        }
        if (this.isRunningToInterrupted(current)) {
            this.lastState = current;
            this.emitter = new Interrupted();
            this.transition = new KeepState(this.emitter);
            return;
        }
        if (this.isInterruptedToRunning(current)) {
            this.lastState = current;
            this.emitter = new Running();
            this.transition = new KeepState(this.emitter);
            return;
        }
        if (this.isRunningToInitial(current)) {
            this.lastState = current;
            this.emitter = new Undefined();
            this.transition = new RunningToInitial(this.emitter);
            return;
        }
        if (this.isInterruptedToInitial(current)) {
            this.lastState = current;
            this.emitter = new Undefined();
            this.transition = new InterruptedToInitial(this.emitter);
            return;
        }

        function getInitialEmitter() {
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
