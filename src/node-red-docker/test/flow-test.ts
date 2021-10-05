import "mocha";
import { expect } from "chai";
import * as sinon from "sinon";

const requiredNodes = [
    require("../node_modules/@node-red/nodes/core/common/20-inject.js"),
    require("../node_modules/@node-red/nodes/core/common/21-debug.js"),
    require("../node_modules/@node-red/nodes/core/function/10-function.js"),
    require("../node_modules/@node-red/nodes/core/function/10-switch.js"),
    require("../node_modules/@node-red/nodes/core/function/89-delay.js"),
];

describe("Node-RED flow test", () => {
    const helper = require("node-red-node-test-helper");
    let inputNodeIds: string[] = [];
    let outputNodeIds: string[] = [];

    function loadFlowFile() {
        const flow: any[] = require("../flow/flows.json");
        flow.forEach((node) => {
            if (node.type === "inject") {
                inputNodeIds[inputNodeIds.length] = node.id;
                node.type = "helper";
            }
            if (node.type === "debug") {
                outputNodeIds[outputNodeIds.length] = node.id;
                node.type = "helper";
            }
        });
        return flow;
    }

    before(() => {
        helper.init(require.resolve('node-red'));
    });

    beforeEach((done) => {
        helper.startServer(done);
    });

    afterEach((done) => {
        helper.unload().then(() => {
            helper.stopServer(done);
        });
    })

    function runFirstTest(done: Mocha.Done) {
        const flow = loadFlowFile();
        helper.load(requiredNodes, flow, () => {
            const inputNode = helper.getNode(inputNodeIds[0]);
            const outputNode = helper.getNode(outputNodeIds[0]);

            outputNode.on("input", (msg: any) => {
                try {
                    expect(msg.payload).to.equal("payload contains 0")
                    done();
                } catch (e) {
                    done(e);
                }
            });

            inputNode.wires[0].forEach((wire: string) => {
                const node = helper.getNode(wire);
                node.receive({ payload: 123450 });
            })
        });
    }

    it("should send 'payload contains 0' when the first digit is 0", (done) => {
        runFirstTest(done);
    });

    it("should send 'payload contains 1' when the first digit is 1", (done) => {
        const flow = loadFlowFile();
        helper.load(requiredNodes, flow, () => {
            const inputNode = helper.getNode(inputNodeIds[0]);
            const outputNode = helper.getNode(outputNodeIds[0]);

            outputNode.on("input", (msg: any) => {
                try {
                    expect(msg.payload).to.equal("payload contains 1")
                    done();
                } catch (e) {
                    done(e);
                }
            });

            inputNode.wires[0].forEach((wire: string) => {
                const node = helper.getNode(wire);
                node.receive({ payload: 123451 });
            })
        });
    });

    it("should send 'payload contains neither 0 nor 1' when the first digit is 2", (done) => {
        const flow = loadFlowFile();
        helper.load(requiredNodes, flow, () => {
            const inputNode = helper.getNode(inputNodeIds[0]);
            const outputNode = helper.getNode(outputNodeIds[0]);

            outputNode.on("input", (msg: any) => {
                try {
                    expect(msg.payload).to.equal("payload contains neither 0 nor 1")
                    done();
                } catch (e) {
                    done(e);
                }
            });

            inputNode.wires[0].forEach((wire: string) => {
                const node = helper.getNode(wire);
                node.receive({ payload: 123452 });
            })
        });
    });

    it("make delay node bypass and block switch node", (done) => {
        const flow = loadFlowFile();
        helper.load(requiredNodes, flow, () => {
            const inputNode = helper.getNode(inputNodeIds[0]);
            const outputNode = helper.getNode(outputNodeIds[0]);

            outputNode.on("input", (msg: any) => {
                try {
                    expect(msg.payload).to.equal(123452);
                    done();
                } catch (e) {
                    done(e);
                }
            });

            const delayNode = helper.getNode("51e3ca87.635c04");
            delayNode.on("input", (msg: any) => {
                delayNode.send(msg);
            });

            const switchNode = helper.getNode("56726766.6d5378");
            switchNode.on("input", (msg: any) => { });

            inputNode.wires[0].forEach((wire: string) => {
                const node = helper.getNode(wire);
                node.receive({ payload: 123452 });
            })
        });
    });

    it("should succeed when replacing setTimeout and setInterval", (done) => {
        // Test fails when replacing setImmediate
        // sinon.useFakeTimers({ toFake: ["setImmediate"] });
        sinon.useFakeTimers({ toFake: ["setTimeout", "setInterval"] });
        runFirstTest(done);
    });

    it("should block when the first digit is 3", (done) => {
        const flow = loadFlowFile();
        helper.load(requiredNodes, flow, () => {
            const inputNode = helper.getNode(inputNodeIds[0]);
            const notSendFunctionNode = helper.getNode("49a5f029.e3bdf");

            notSendFunctionNode._complete = (msg: any, err: any) => {
                try {
                    console.log(msg);
                    notSendFunctionNode.trace.should.be.calledWith("not sent");
                    done();
                } catch (e) {
                    done(e);
                }
            };
            inputNode.wires[0].forEach((wire: string) => {
                const node = helper.getNode(wire);
                node.receive({ payload: 123453 });
            })
        });
    });

    it("should set global and flow values", (done) => {
        const flow = loadFlowFile();
        helper.load(requiredNodes, flow, () => {
            const inputNode = helper.getNode(inputNodeIds[1]);
            const outputNode = helper.getNode(outputNodeIds[1]);
            inputNode.context().global.set("global", "global-test-value");
            inputNode.context().flow.set("flow", "flow-test-value");

            outputNode.on("input", (msg: any) => {
                try {
                    expect(msg.payload).to.deep.equal({
                        global: "global-test-value",
                        flow: "flow-test-value",
                        context: "undefined",
                    });
                    done();
                } catch (e) {
                    done(e);
                }
            });

            inputNode.wires[0].forEach((wire: string) => {
                const node = helper.getNode(wire);
                node.receive({ payload: 123453 });
            })
        });
    });
});
