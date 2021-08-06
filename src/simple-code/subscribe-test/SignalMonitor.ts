export type ListenerCallback = (value: number) => void;

export class SignalMonitor {
    private cb?: (value: number) => void;
    public register(cb: ListenerCallback) {
        this.cb = cb;
    }
    public update(value: number): void {
        this.cb?.(value);
    }
}
