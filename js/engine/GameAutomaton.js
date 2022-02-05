"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameAutomaton = void 0;
const interfaces_js_1 = require("../regulates/interfaces.js");
const Player_js_1 = require("./Player.js");
class GameAutomaton {
    constructor(deck) {
        this.gameState = {
            playerState: [new Player_js_1.Player(0, deck[0]), new Player_js_1.Player(1, deck[1])],
            automatonState: {
                stage: interfaces_js_1.GameStage.INIT,
                /* true: Alice, false: Bob */
                priority: 0,
                operation: interfaces_js_1.PlayerOperation.PRACTICE,
            }
        };
    }
    practice(choice) {
    }
}
exports.GameAutomaton = GameAutomaton;
