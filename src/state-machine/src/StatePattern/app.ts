import { Context, Context2 } from "./Context";
import { NotSelected } from "./MachineState";
import { NotSelectedWithTransition } from "./MachineStateWithTransition";
import { MachineEvent } from "./StateDefs";

// const context = new Context(new NotSelected());
const context = new Context2(new NotSelectedWithTransition());

context.changeState(MachineEvent.Selected);
context.changeState(MachineEvent.ProgramStarted);
context.changeState(MachineEvent.Stopped);
context.changeState(MachineEvent.Started);
context.changeState(MachineEvent.Interrupted);
context.changeState(MachineEvent.ProgramCanceled);
context.changeState(MachineEvent.SelectCleared);
context.changeState(MachineEvent.Selected);
context.changeState(MachineEvent.ProgramStarted);
context.changeState(MachineEvent.Error);
context.changeState(MachineEvent.ErrorCleared);
context.changeState(MachineEvent.Started);
context.changeState(MachineEvent.Finished);
context.changeState(MachineEvent.ProgramCompleted);
