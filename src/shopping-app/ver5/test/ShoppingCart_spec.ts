import "mocha";
import { expect } from "chai";
import { ShoppingCart } from "../ShoppingCart";
import { ItemName } from "../Item";

describe("ShoppingCart", () => {
    let cart: ShoppingCart;
    beforeEach(() => {
        cart = new ShoppingCart();
    });

    describe("addItem", () => {
        it("should add an item", () => {
            cart.addItem(ItemName.Apple, 2);
            const itemList = cart.getList();
            const expected = {
                name: ItemName.Apple,
                numberOfItems: 2,
            };
            expect(itemList).to.deep.include(expected);
        });

        it("should sum the number of items for the same item", () => {
            cart.addItem(ItemName.Apple, 2);
            cart.addItem(ItemName.Apple, 3);
            const itemList = cart.getList();
            const expected = {
                name: ItemName.Apple,
                numberOfItems: 5,
            };
            expect(itemList).to.deep.include(expected);
        });

        it("should add the different item", () => {
            cart.addItem(ItemName.Apple, 2);
            cart.addItem(ItemName.Water, 3);
            const itemList = cart.getList();
            const expected = [
                {
                    name: ItemName.Apple,
                    numberOfItems: 2,
                },
                {
                    name: ItemName.Water,
                    numberOfItems: 3,
                }
            ];
            expect(itemList).to.deep.members(expected);
        });
    });

    describe("removeItem", () => {
        it("should not throw an error when no item exists", () => {
            cart.removeItem(ItemName.Apple, 1);
            const itemList = cart.getList();
            const expected = {
                name: ItemName.Apple,
                numberOfItems: 2,
            };
            expect(itemList).to.deep.include(expected)
        });
    });
    describe("addItem", () => {
        it("should add an item", () => {
        });
    });

});