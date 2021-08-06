import { Broker } from "./Broker";

export class Client {
    private canTrigger = false;
    private status = 0;

    constructor(private broker: Broker) {
        this.broker.subscribe((value: number) => {
            // const isEvenNumber = value % 2 === 0;
            // this.canTrigger = this.status === 2 && isEvenNumber;
            this.callbackFunc(value);
        });
    }

    public updateStatus() {
        if (this.status > 2) {
            this.status = 0;
        } else {
            this.status++;
        }
    }

    public doSomething(): string {
        if (this.canTrigger) {
            return "loading";
        }
        return "...";
    }

    protected callbackFunc(value: number) {
        const isEvenNumber = value % 2 === 0;
        this.canTrigger = this.status === 2 && isEvenNumber;
    }
}