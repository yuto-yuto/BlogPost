import { ListenerCallback, SignalMonitor } from "./SignalMonitor";

export class Broker {
    private listeners: ListenerCallback[] = [];

    constructor(signalMonitor: SignalMonitor) {
        signalMonitor.register((value: number) => {
            this.listeners.forEach((listener) => listener(value));
        });
    }

    public subscribe(cb: ListenerCallback): void {
        this.listeners.push(cb);
    }
}
