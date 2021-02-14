"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var requiredNodes = [
    require("../node_modules/@node-red/nodes/core/common/20-inject.js"),
    require("../node_modules/@node-red/nodes/core/common/21-debug.js"),
    require("../node_modules/@node-red/nodes/core/function/10-function.js"),
    require("../node_modules/@node-red/nodes/core/function/10-switch.js"),
];
describe("Node-RED flow test", function () {
    var helper = require("node-red-node-test-helper");
    var inputNodeId;
    var outputNodeId;
    function loadFlowFile() {
        var flow = require("../flow/flows.json");
        flow.forEach(function (node) {
            if (node.type === "inject") {
                inputNodeId = node.id;
                node.type = "helper";
            }
            if (node.type === "debug") {
                outputNodeId = node.id;
                node.type = "helper";
            }
        });
        return flow;
    }
    before(function () {
        helper.init(require.resolve('node-red'));
    });
    beforeEach(function (done) {
        helper.startServer(done);
    });
    afterEach(function (done) {
        helper.unload().then(function () {
            helper.stopServer(done);
        });
    });
    it("should send 'payload contains 0' when the first digit is 0", function (done) {
        var flow = loadFlowFile();
        helper.load(requiredNodes, flow, function () {
            var inputNode = helper.getNode(inputNodeId);
            var outputNode = helper.getNode(outputNodeId);
            outputNode.on("input", function (msg) {
                try {
                    chai_1.expect(msg.payload).to.equal("payload contains 0");
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
            inputNode.wires[0].forEach(function (wire) {
                var node = helper.getNode(wire);
                node.receive({ payload: 123450 });
            });
        });
    });
    it("should send 'payload contains 1' when the first digit is 1", function (done) {
        var flow = loadFlowFile();
        helper.load(requiredNodes, flow, function () {
            var inputNode = helper.getNode(inputNodeId);
            var outputNode = helper.getNode(outputNodeId);
            outputNode.on("input", function (msg) {
                try {
                    chai_1.expect(msg.payload).to.equal("payload contains 1");
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
            inputNode.wires[0].forEach(function (wire) {
                var node = helper.getNode(wire);
                node.receive({ payload: 123451 });
            });
        });
    });
    it("should send 'payload contains neither 0 nor 1' when the first digit is 1", function (done) {
        var flow = loadFlowFile();
        helper.load(requiredNodes, flow, function () {
            var inputNode = helper.getNode(inputNodeId);
            var outputNode = helper.getNode(outputNodeId);
            outputNode.on("input", function (msg) {
                try {
                    chai_1.expect(msg.payload).to.equal("payload contains neither 0 nor 1");
                    done();
                }
                catch (e) {
                    done(e);
                }
            });
            inputNode.wires[0].forEach(function (wire) {
                var node = helper.getNode(wire);
                node.receive({ payload: 123452 });
            });
        });
    });
    it("make switch node bypass", function (done) {
        var flow = loadFlowFile();
        helper.load(requiredNodes, flow, function () {
            var inputNode = helper.getNode(inputNodeId);
            var outputNode = helper.getNode(outputNodeId);
            var switchNode = helper.getNode("56726766.6d5378");
            var msgCount = 0;
            outputNode.on("input", function (msg) {
                console.log(msg);
                if (++msgCount === 3) {
                    done();
                }
            });
            switchNode.on("input", function (msg) {
                switchNode.send(msg);
            });
            inputNode.wires[0].forEach(function (wire) {
                var node = helper.getNode(wire);
                node.receive({ payload: 123452 });
            });
        });
    });
});
