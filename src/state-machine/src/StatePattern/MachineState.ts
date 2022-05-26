import { MachineEvent, State, } from "./StateDefs";
import { UnexpectedEventError } from "./UnexpectedError";

export interface MachineState {
    readonly currentState: State;
    changeState(event: MachineEvent): MachineState;
}

export class NotSelected implements MachineState {
    public readonly currentState = State.NotSelected;

    public changeState(event: MachineEvent): MachineState {
        if (event !== MachineEvent.Selected) {
            throw new UnexpectedEventError();
        }
        return new Idle();
    }
}

export class Idle implements MachineState {
    public readonly currentState = State.Idle;

    public changeState(event: MachineEvent): MachineState {
        switch (event) {
            case MachineEvent.ProgramStarted: return new Running();
            case MachineEvent.SelectCleared: return new NotSelected();
            default:
                throw new UnexpectedEventError();
        }
    }
}

export class Running implements MachineState {
    public readonly currentState = State.Running;

    public changeState(event: MachineEvent): MachineState {
        switch (event) {
            case MachineEvent.Stopped: return new Stopped();
            case MachineEvent.Interrupted: return new Interrupted();
            case MachineEvent.Error: return new ErrorState();
            case MachineEvent.Finished: return new Finished();
            default:
                throw new UnexpectedEventError();
        }
    }
}

export class Stopped implements MachineState {
    public readonly currentState = State.Stopped;

    public changeState(event: MachineEvent): MachineState {
        switch (event) {
            case MachineEvent.Started: return new Running();
            case MachineEvent.ProgramCanceled: return new Idle();
            default:
                throw new UnexpectedEventError();
        }
    }
}

export class Interrupted implements MachineState {
    public readonly currentState = State.Interrupted;

    public changeState(event: MachineEvent): MachineState {
        switch (event) {
            case MachineEvent.Started: return new Running();
            case MachineEvent.Error: return new ErrorState();
            case MachineEvent.ProgramCanceled: return new Idle();
            default:
                throw new UnexpectedEventError();
        }
    }
}

export class Finished implements MachineState {
    public readonly currentState = State.Finished;

    public changeState(event: MachineEvent): MachineState {
        switch (event) {
            case MachineEvent.ProgramCompleted: return new Idle();
            case MachineEvent.ProgramCanceled: return new Idle();
            case MachineEvent.Error: return new ErrorState();
            default:
                throw new UnexpectedEventError();
        }
    }
}

export class ErrorState implements MachineState {
    public readonly currentState = State.Error;

    public changeState(event: MachineEvent): MachineState {
        switch (event) {
            case MachineEvent.ErrorCleared: return new Interrupted();
            case MachineEvent.ProgramCanceled: return new Idle();
            default:
                throw new UnexpectedEventError();
        }
    }
}
