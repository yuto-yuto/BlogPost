import { countup, displayCount } from "./count";

export function call2() {
    console.log("--- Caller2 ---");
    countup();
    countup();
    displayCount()
}