import "mocha";
import { expect } from "chai";
import * as sinon from "sinon";
import { ShoppingCart } from "../ShoppingCart";
import { AddCommand } from "../Command/AddCommand";
import { MyConsole, ShoppingConsole } from "../MyConsole";

describe("AddCommand", () => {
    let shoppingCart: ShoppingCart;
    let shoppingConsole: ShoppingConsole;
    let command: AddCommand;
    let cartStub: sinon.SinonStub;
    let consoleStub: sinon.SinonStub;

    beforeEach(() => {
        shoppingCart = new ShoppingCart();
        cartStub = sinon.stub(shoppingCart, "addItem");
        shoppingConsole = new ShoppingConsole();
        consoleStub = sinon.stub(shoppingConsole, "log");
        command = new AddCommand(shoppingCart, shoppingConsole);
    });

    afterEach(() => {
        cartStub.restore();
        consoleStub.restore();
    });

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
            expect(consoleStub.calledWith("Table doesn't exist.")).to.be.true;
        });

        it("should pass test without using sinon", () => {
            const testConsole: MyConsole = {
                log: (args: any[]) => {
                    expect(args).to.equal("Table doesn't exist.");
                },
                error: (args: any[]) => { },
            };
            const testClass = new AddCommand(shoppingCart, testConsole);
            testClass.execute(["Table", "1"]);
        });

        it("should throw an error when arg length is 1", () => {
            const result = () => command.execute(["Hey"]);
            expect(result).to.throw("requires 2 arguments.")
        });
    });
});
