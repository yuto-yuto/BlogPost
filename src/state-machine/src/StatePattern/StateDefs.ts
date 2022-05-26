export enum MachineEvent {
    Selected,
    SelectCleared,
    ProgramStarted,
    Stopped,
    Started,
    ProgramCanceled,
    Interrupted,
    Error,
    ErrorCleared,
    Finished,
    ProgramCompleted,
}

export enum State {
    NotSelected,
    Idle,
    Running,
    Stopped,
    Interrupted,
    Error,
    Finished,
}

export enum Transition {
    NotSelected_Idle,
    Idle_NotSelected,
    Idle_Running,
    Running_Stopped,
    Running_Interrupted,
    Running_Error,
    Running_Finished,
    Stopped_Idle,
    Stopped_Running,
    Interrupted_Idle,
    Interrupted_Running,
    Interrupted_Error,
    Error_Interrupted,
    Error_Idle,
    Finished_Idle,
    Finished_Error,
}
