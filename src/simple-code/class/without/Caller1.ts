import { countup, displayCount } from "./count";

export function call1() {
    console.log("--- Caller1 ---");
    countup();
    countup();
    displayCount()
}