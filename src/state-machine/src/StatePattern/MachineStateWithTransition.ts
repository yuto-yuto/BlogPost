import { MachineState } from "./MachineState";
import { MachineEvent, State, Transition, } from "./StateDefs";
import { UnexpectedEventError } from "./UnexpectedError";

export interface MachineStateWithTransition extends MachineState {
    readonly transition: Transition | null;
    changeState(event: MachineEvent): MachineStateWithTransition;
}

export class NotSelectedWithTransition implements MachineStateWithTransition {
    public readonly currentState = State.NotSelected;
    public readonly transition: Transition | null;

    constructor(state?: State) {
        this.transition = state === State.Idle ? Transition.Idle_NotSelected : null;
    }

    public changeState(event: MachineEvent): MachineStateWithTransition {
        if (event !== MachineEvent.Selected) {
            throw new UnexpectedEventError();
        }
        return new IdleWithTransition(State.NotSelected);
    }
}

export class IdleWithTransition implements MachineStateWithTransition {
    public readonly currentState = State.Idle;
    public readonly transition: Transition | null;

    constructor(state?: State) {
        switch (state) {
            case State.Interrupted:
                this.transition = Transition.Interrupted_Idle;
                return;
                case State.NotSelected:
                this.transition = Transition.NotSelected_Idle;
                return;
            case State.Stopped:
                this.transition = Transition.Stopped_Idle;
                return;
            case State.Finished:
                this.transition = Transition.Finished_Idle;
                return;
            case State.Error:
                this.transition = Transition.Error_Idle;
                return;
            default:
                this.transition = null;

        }
    }

    public changeState(event: MachineEvent): MachineStateWithTransition {
        switch (event) {
            case MachineEvent.ProgramStarted: return new RunningWithTransition(State.Idle);
            case MachineEvent.SelectCleared: return new NotSelectedWithTransition(State.Idle);
            default:
                throw new UnexpectedEventError();
        }
    }
}

export class RunningWithTransition implements MachineStateWithTransition {
    public readonly currentState = State.Running;
    public readonly transition: Transition | null;

    constructor(state?: State) {
        switch (state) {
            case State.Idle:
                this.transition = Transition.Idle_Running;
                return;
            case State.Stopped:
                this.transition = Transition.Stopped_Running;
                return;
            case State.Interrupted:
                this.transition = Transition.Interrupted_Running;
                return;
            default: this.transition = null;
        }
    }

    public changeState(event: MachineEvent): MachineStateWithTransition {
        switch (event) {
            case MachineEvent.Stopped: return new StoppedWithTransition(State.Running);
            case MachineEvent.Interrupted: return new InterruptedWithTransition(State.Running);
            case MachineEvent.Error: return new ErrorStateWithTransition(State.Running);
            case MachineEvent.Finished: return new FinishedWithTransition(State.Running);
            default:
                throw new UnexpectedEventError();
        }
    }
}

export class StoppedWithTransition implements MachineStateWithTransition {
    public readonly currentState = State.Stopped;
    public readonly transition: Transition | null;

    constructor(state?: State) {
        this.transition = state === State.Running ? Transition.Running_Stopped : null;
    }

    public changeState(event: MachineEvent): MachineStateWithTransition {
        switch (event) {
            case MachineEvent.Started: return new RunningWithTransition(State.Stopped);
            case MachineEvent.ProgramCanceled: return new IdleWithTransition(State.Stopped);
            default:
                throw new UnexpectedEventError();
        }
    }
}

export class InterruptedWithTransition implements MachineStateWithTransition {
    public readonly currentState = State.Interrupted;
    public readonly transition: Transition | null;

    constructor(state?: State) {
        switch (state) {
            case State.Running:
                this.transition = Transition.Running_Interrupted;
                return;
            case State.Error:
                this.transition = Transition.Error_Interrupted;
                return;
            default:
                this.transition = null;
        }
    }

    public changeState(event: MachineEvent): MachineStateWithTransition {
        switch (event) {
            case MachineEvent.Started: return new RunningWithTransition(State.Interrupted);
            case MachineEvent.Error: return new ErrorStateWithTransition(State.Interrupted);
            case MachineEvent.ProgramCanceled: return new IdleWithTransition(State.Interrupted);
            default:
                throw new UnexpectedEventError();
        }
    }
}

export class FinishedWithTransition implements MachineStateWithTransition {
    public readonly currentState = State.Finished;
    public readonly transition: Transition | null;

    constructor(state?: State) {
        this.transition = state === State.Running ? Transition.Running_Finished : null;
    }

    public changeState(event: MachineEvent): MachineStateWithTransition {
        switch (event) {
            case MachineEvent.ProgramCompleted: return new IdleWithTransition(State.Finished);
            case MachineEvent.ProgramCanceled: return new IdleWithTransition(State.Finished);
            case MachineEvent.Error: return new ErrorStateWithTransition(State.Finished);
            default:
                throw new UnexpectedEventError();
        }
    }
}

export class ErrorStateWithTransition implements MachineStateWithTransition {
    public readonly currentState = State.Error;
    public readonly transition: Transition | null;

    constructor(state?: State) {
        switch (state) {
            case State.Running:
                this.transition = Transition.Running_Error;
                return;
            case State.Interrupted:
                this.transition = Transition.Interrupted_Error;
                return;
            case State.Finished:
                this.transition = Transition.Finished_Error;
                return;
            default:
                this.transition = null;
        }
    }

    public changeState(event: MachineEvent): MachineStateWithTransition {
        switch (event) {
            case MachineEvent.ErrorCleared: return new InterruptedWithTransition(State.Error);
            case MachineEvent.ProgramCanceled: return new IdleWithTransition(State.Error);
            default:
                throw new UnexpectedEventError();
        }
    }
}
