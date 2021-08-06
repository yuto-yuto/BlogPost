import { Broker } from "./Broker";

export class ClientStatus {
    // static function can be replaced with fake object
    public static factory(): ClientStatus {
        return new ClientStatus();
    }

    private _canTrigger = false;
    private status = 0;
    private constructor() { }

    public get canTrigger(): boolean {
        return this._canTrigger;
    }

    public updateStatus() {
        if (this.status > 2) {
            this.status = 0;
        } else {
            this.status++;
        }
    }

    public callbackFunc(value: number) {
        const isEvenNumber = value % 2 === 0;
        this._canTrigger = this.status === 2 && isEvenNumber;
    }
}

export class Client2 {
    private clientStatus = ClientStatus.factory();

    constructor(private broker: Broker) {
        this.broker.subscribe((value: number) => {
            this.clientStatus.callbackFunc(value);
        });
    }

    public updateStatus() {
        this.clientStatus.updateStatus();
    }

    public doSomething(): string {
        if (this.clientStatus.canTrigger) {
            return "loading";
        }
        return "...";
    }
}