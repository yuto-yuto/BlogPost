import * as util from "./Util";

export class Example {
    public return5() {
        return 2 + util.return3();
    }
}

export class Example2 {
    private _utilFunction = util.return3;
    public set utilFunction(value: () => number) {
        this._utilFunction = value;
    }

    public return5() {
        return 2 + this._utilFunction();
    }
}
