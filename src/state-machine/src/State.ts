export enum State {
    Undefined = "Undefined",
    Initial = "Initial",
    Running = "Running",
    Interrupted = "Interrupted",
    Aborted = "Aborted",
    Ended = "Ended",
    // internal state
    DummyRunning = "DummyRunning",
    RunningToInitial = "RunningToInitial",
    InterruptedToInitial = "InterruptedToInitial",
}
