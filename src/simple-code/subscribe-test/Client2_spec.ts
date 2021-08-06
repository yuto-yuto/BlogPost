import "mocha";
import { expect } from "chai";
import * as sinon from "sinon";
import { Client } from "./Client";
import { SignalMonitor } from "./SignalMonitor";
import { Broker } from "./Broker";
import { Client2, ClientStatus } from "./Client2";

describe("Client2", () => {
    let client: Client2;
    let clientStatus: ClientStatus;

    beforeEach(() => {
        const monitor = new SignalMonitor();
        const broker = new Broker(monitor);
        clientStatus = ClientStatus.factory();
        sinon.stub(ClientStatus, "factory").returns(clientStatus);
        client = new Client2(broker);
    });

    afterEach(()=>{
        sinon.restore();
    });

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
            clientStatus.callbackFunc(12);
            const result = client.doSomething();
            expect(result).to.equal("loading");
        });
    });
});