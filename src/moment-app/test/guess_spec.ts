import "mocha";
import { expect } from "chai";
import * as moment from "moment-timezone";
import { guess } from "../lib/guess";
import * as sinon from "sinon";

describe("guess", () => {
    before(() => {
        moment.tz.setDefault("Europe/London");
    });
    after(() => {
        moment.tz.setDefault();
    });

    it("should return Berlin", () => {
        const result = guess();
        expect(result).to.equal("Berlin");
    });
});
