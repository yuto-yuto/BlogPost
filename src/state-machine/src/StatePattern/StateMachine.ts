import { MachineEvent, State } from "./StateDefs";
import { UnexpectedEventError } from "./UnexpectedError";

export class StateMachine {
    public get currentState(): State {
        return this._currentState;
    }

    constructor(private _currentState: State) { }
    public changeState(event: MachineEvent) {
        let newState: State | undefined;

        switch (this._currentState) {
            case State.NotSelected:
                if (event === MachineEvent.Selected) {
                    newState = State.Idle;
                }
                break;
            case State.Idle:
                if (event === MachineEvent.SelectCleared) {
                    newState = State.NotSelected;
                } else if (event === MachineEvent.ProgramStarted) {
                    newState = State.Running;
                }
                break;
            case State.Running:
                if (event === MachineEvent.Stopped) {
                    newState = State.Stopped;
                } else if (event === MachineEvent.Interrupted) {
                    newState = State.Interrupted;
                } else if (event === MachineEvent.Finished) {
                    newState = State.Finished;
                } else if (event === MachineEvent.Error) {
                    newState = State.Error;
                }
                break;
            case State.Stopped:
                if (event === MachineEvent.ProgramCanceled) {
                    newState = State.Idle;
                } else if (event === MachineEvent.Started) {
                    newState = State.Running;
                }
                break;
            case State.Interrupted:
                if (event === MachineEvent.ProgramCanceled) {
                    newState = State.Idle;
                } else if (event === MachineEvent.Error) {
                    newState = State.Error;
                } else if (event === MachineEvent.Started) {
                    newState = State.Running;
                }
                break;
            case State.Error:
                if (event === MachineEvent.ErrorCleared) {
                    newState = State.Interrupted;
                } else if (event === MachineEvent.ProgramCanceled) {
                    newState = State.Idle;
                }
                break;
            case State.Finished:
                if (event === MachineEvent.ProgramCanceled) {
                    newState = State.Idle;
                } else if (event === MachineEvent.ProgramCompleted) {
                    newState = State.Idle;
                } else if (event === MachineEvent.Error) {
                    newState = State.Error;
                }
                break;
            default: break;
        }

        if (newState === undefined) {
            throw new UnexpectedEventError();
        }

        this._currentState = newState;
    }
}