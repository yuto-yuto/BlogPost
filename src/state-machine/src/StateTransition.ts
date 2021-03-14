import { Aborted, DummyRunning, Emitter, Ended, Undefined } from "./Emitter";
import { Key } from "./Key";

export interface ComputeArgs {
    key: string;
    value: number | boolean;
    count1: number;
};
export interface ChangeableState {
    emitter: Emitter;
    transition: StateTransition;
}

export abstract class StateTransition {
    protected map = new Map<string, number | boolean>();
    constructor(protected emitter: Emitter) { }
    abstract compute(args: ComputeArgs): ChangeableState;
}

export class KeepState extends StateTransition {
    public compute(args: ComputeArgs): ChangeableState {
        return {
            emitter: this.emitter,
            transition: this,
        };
    }
}

export class RunningToInitial extends StateTransition {
    public compute(args: ComputeArgs): ChangeableState {
        this.map.set(args.key, args.value);

        const count2 = this.map.get(Key.Count2);
        const count3 = this.map.get(Key.Count3);
        if (count2 === undefined ||
            count3 === undefined
        ) {
            return {
                emitter: new Undefined(),
                transition: this,
            };
        }

        const isEnded = (args.count1 === count2)
            && (count3 === 0);
        const emitter = isEnded ? new Ended() : new Aborted();
        return {
            emitter: emitter,
            transition: new KeepState(emitter.nextState),
        };
    }
}

export class InterruptedToInitial extends StateTransition {
    public compute(args: ComputeArgs): ChangeableState {
        this.map.set(args.key, args.value);

        const count2 = this.map.get(Key.Count2);
        const flag = this.map.get(Key.Flag);
        if (count2 === undefined ||
            flag === undefined
        ) {
            return {
                emitter: new Undefined(),
                transition: this,
            };
        }

        const isDummyRunning = (args.count1 === count2)
            && (flag === false);
        const emitter = isDummyRunning ?
            new DummyRunning() : new Aborted();
        return {
            emitter: emitter,
            transition: new KeepState(emitter.nextState),
        };
    }
}
