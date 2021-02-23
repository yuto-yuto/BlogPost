import { NS } from "./NS";
import { SampleAbstractClass } from "./SampleAbstractClass";
import { SampleClass } from "./SampleClass";
import { return3 } from "./Util";

console.log(SampleAbstractClass.return1());
console.log(SampleClass.return2());
console.log(return3());
console.log(NS.return4());

{
    const obj = new SampleClass();
    console.log(obj instanceof SampleClass);
}

{
    // Error
    // const obj = new SampleAbstractClass();
}
