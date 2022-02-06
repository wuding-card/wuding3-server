"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStack = void 0;
const interfaces_1 = require("../regulates/interfaces");
const utils_1 = require("../regulates/utils");
class EventStack {
    constructor(gameState) {
        this.stack = [];
        this.gameState = gameState;
    }
    empty() {
        return this.stack.length == 0;
    }
    push(item) {
        this.stack.push(item);
    }
    pop() {
        (0, utils_1.assert)(!this.empty());
        const item = this.stack.pop();
        return item;
    }
    resolve() {
        (0, utils_1.assert)(!this.empty());
        const item = this.stack.pop();
        switch (item.type) {
            case interfaces_1.EventItemType.EVENT: {
                const event = item.container;
                event.resolve(this.gameState);
            }
            case interfaces_1.EventItemType.IMMEDIATE: {
            }
            default: {
            }
        }
    }
}
exports.EventStack = EventStack;
