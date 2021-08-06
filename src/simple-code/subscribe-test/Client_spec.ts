import "mocha";
import { expect } from "chai";
import { Client } from "./Client";
import { SignalMonitor } from "./SignalMonitor";
import { Broker } from "./Broker";

class ExtendedClient extends Client {
    public callbackFunc(value: number): void {
        super.callbackFunc(value);
    }
}

describe("Client", () => {
    let client: Client;

    beforeEach(() => {
        const monitor = new SignalMonitor();
        const broker = new Broker(monitor);
        client = new Client(broker);
    })
    describe("doSomething", () => {
        it("should return '...' for the first time", () => {
            const result = client.doSomething();
            expect(result).to.equal("...");
        });

        it("should return '...' when status is 2 but it receives no value from monitor", () => {
            client.updateStatus();
            client.updateStatus();
            const result = client.doSomething();
            expect(result).to.equal("...");
        });

        it("should return 'loading' when status is 2 and it receives even number from monitor", () => {
            client.updateStatus();
            client.updateStatus();
            const result = client.doSomething();
            expect(result).to.equal("...");
        });
    });
});