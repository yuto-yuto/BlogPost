import { Broker } from "./Broker";
import { Client } from "./Client";
import { Client2 } from "./Client2";
import { SignalMonitor } from "./SignalMonitor";

const monitor = new SignalMonitor();
const broker = new Broker(monitor);
// const client = new Client(broker);
const client = new Client2(broker);

monitor.update(2);
console.log("1: " + client.doSomething());

client.updateStatus();
monitor.update(4);
console.log("2: " + client.doSomething());

client.updateStatus();
console.log("3: " + client.doSomething());
monitor.update(6);
console.log("4: " + client.doSomething());

client.updateStatus();
monitor.update(8);
console.log("5: " + client.doSomething());
