import { MachineState } from "./MachineState";
import { MachineStateWithTransition } from "./MachineStateWithTransition";
import { MachineEvent, State, Transition } from "./StateDefs";

export class Context {
    constructor(private machineState: MachineState) {
        this.machineState = machineState;
    }
    public changeState(event: MachineEvent): void {
        try {
            this.machineState = this.machineState.changeState(event);
            console.log(State[this.machineState.currentState]);
        } catch (e) {
            console.log(`!!! Error !!! ${e}`);
        }
    }
}

export class Context2 {
    constructor(private machineState: MachineStateWithTransition) {
        this.machineState = machineState;
    }
    public changeState(event: MachineEvent): void {
        try {
            this.machineState = this.machineState.changeState(event);
            const state = State[this.machineState.currentState];
            const transition = this.machineState.transition !== null ?
                Transition[this.machineState.transition] : null;
            console.log(`${state.padEnd(15, " ")}\t${transition}`);
        } catch (e) {
            console.log(`!!! Error !!! ${e}`);
        }
    }
}
