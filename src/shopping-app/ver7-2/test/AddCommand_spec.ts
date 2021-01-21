import "mocha";
import { expect } from "chai";
import * as sinon from "sinon";
import { ShoppingCart } from "../ShoppingCart";
import { AddCommand } from "../Command/AddCommand";

describe("AddCommand", () => {
    let shoppingCart: ShoppingCart;
    let command: AddCommand;
    let cartStub: sinon.SinonStub;

    beforeEach(() => {
        shoppingCart = new ShoppingCart();
        cartStub = sinon.stub(shoppingCart, "addItem");
        command = new AddCommand(shoppingCart);
    });

    afterEach(() => {
        cartStub.restore();
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

        it("should not call addItem when specifying item which doesn't exist", () => {
            command.execute(["Table", "1"]);
            expect(cartStub.notCalled).to.be.true;
        });

        it("should throw an error when arg length is 1", () => {
            const result = () => command.execute(["Hey"]);
            expect(result).to.throw("requires 2 arguments.")
        });
    });
});
