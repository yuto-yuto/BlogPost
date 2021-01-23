import "mocha";
import { expect } from "chai";
import * as sinon from "sinon";
import { ShoppingCart } from "../ShoppingCart";
import { AddCommand } from "../Command/AddCommand";
import { StaticConsole } from "../StaticConsole";

describe("AddCommand", () => {
    let shoppingCart: ShoppingCart;
    let command: AddCommand;
    let cartStub: sinon.SinonStub;
    let consoleSpy: sinon.SinonSpy;

    beforeEach(() => {
        shoppingCart = new ShoppingCart();
        cartStub = sinon.stub(shoppingCart, "addItem");
        command = new AddCommand(shoppingCart);
        consoleSpy = sinon.spy(StaticConsole, "log");
    });

    afterEach(() => {
        cartStub.restore();
        consoleSpy.restore();
    })

    describe("execute", () => {
        [
            { itemName: "apple", count: 1 },
            { itemName: "water", count: 2 },
            { itemName: "coffee", count: 3 },
        ].forEach((data) => {
            it(`should call addItem when specifying ${data.itemName}`, () => {
                command.execute([data.itemName, data.count.toString()]);
                expect(cartStub.calledWith(data.itemName as any, data.count)).to.be.true;
            });
        });

        it("should not call addItem when specified item doesn't exist", () => {
            command.execute(["Table", "1"]);
            expect(cartStub.notCalled).to.be.true;
        });

        it("should output message when specified item doesn't exist", () => {
            command.execute(["Table", "1"]);
            expect(consoleSpy.calledWith("Table doesn't exist.")).to.be.true;
        });

        it("should throw an error when arg length is 1", () => {
            const result = () => command.execute(["Hey"]);
            expect(result).to.throw("requires 2 arguments.")
        });
    });
});
