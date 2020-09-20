import { expect } from "chai";
import { Editor } from "../lib/Editor";

describe("Editor", () => {
    describe("edit", () => {
        it("should not throw an error when text length is 96 with default decorator", () => {
            const editor = new Editor();
            const result = () => editor.edit("x".repeat(96));
            expect(result).to.not.throw();
        });
        it("should throw an error when text length is 97 with default decorator", () => {
            const editor = new Editor();
            const result = () => editor.edit("x".repeat(97));
            expect(result).to.throw();
        });
    });
});