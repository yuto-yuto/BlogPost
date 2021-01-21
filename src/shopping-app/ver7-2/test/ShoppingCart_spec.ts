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
            const result = cart.getList();
            const expected = {
                name: ItemName.Apple,
                numberOfItems: 2,
            };
            expect(result).to.deep.include(expected);
        });

        it("should sum the number of items for the same item", () => {
            cart.addItem(ItemName.Apple, 2);
            cart.addItem(ItemName.Apple, 3);
            const result = cart.getList();
            const expected = {
                name: ItemName.Apple,
                numberOfItems: 5,
            };
            expect(result).to.deep.include(expected);
        });

        it("should add the different item", () => {
            cart.addItem(ItemName.Apple, 2);
            cart.addItem(ItemName.Water, 3);
            const result = cart.getList();
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
            expect(result).to.deep.members(expected);
        });

        it("should throw an error when numberOfItem is 0", () => {
            const result = () => cart.addItem(ItemName.Apple, 0);
            expect(result).to.throw();
        });
    });

    describe("removeItem", () => {
        it("should throw an error when numberOfItems is 0", () => {
            const result = () => cart.removeItem(ItemName.Apple, 0);
            expect(result).to.throw();
        });
        it("should throw an error when specified item doesn't exist", () => {
            const result = () => cart.removeItem(ItemName.Apple, 1);
            expect(result).to.throw();
        });
        it("should remove one if number of items is 2", () => {
            cart.addItem(ItemName.Apple, 2);
            cart.removeItem(ItemName.Apple, 1);
            const result = cart.getList();
            const expected = [
                {
                    name: ItemName.Apple,
                    numberOfItems: 1,
                }
            ];
            expect(result).to.deep.members(expected);
        });
        it("should delete item if number of items to remove is bigger than actual number", () => {
            cart.addItem(ItemName.Apple, 2);
            cart.removeItem(ItemName.Apple, 3);
            const result = cart.getList();
            expect(result).to.be.lengthOf(0);
        });
    });
    describe("getList", () => {
        it("should return empty array when no data exist", () => {
            const result = cart.getList();
            expect(result).to.be.lengthOf(0);
        });
        it("should include name and numberOfItems", () => {
            cart.addItem(ItemName.Apple, 4);
            const result = cart.getList();
            expect(result[0]).to.have.keys("name", "numberOfItems");
        });
    });
    describe("totalPrice", () => {
        it("should sum the price", () => {
            cart.addItem(ItemName.Apple, 1);
            cart.addItem(ItemName.Water, 1);
            expect(cart.totalPrice).to.equal(200)
        });
    });
    describe("totalItemNumber", () => {
        it("should sum the number", () => {
            cart.addItem(ItemName.Apple, 2);
            cart.addItem(ItemName.Water, 1);
            cart.addItem(ItemName.Coffee, 3);
            expect(cart.totalItemNumber).to.equal(6)
        });
    });
});