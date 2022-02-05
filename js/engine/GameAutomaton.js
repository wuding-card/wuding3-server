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
                stage: interfaces_js_1.GameStage.PREPARE,
                step: interfaces_js_1.GameStep.GAME_START,
                /* 0: Alice, 1: Bob */
                priority: 0,
                turn: 0,
                round: 0,
            }
        };
    }
    iterate(signal) {
        switch (this.gameState.automatonState.step) {
            case interfaces_js_1.GameStep.GAME_START:
                {
                    break;
                }
                ;
            case interfaces_js_1.GameStep.UNTAP:
                {
                    break;
                }
                ;
        }
    }
    practice(choice) {
        this.gameState.playerState[this.gameState.automatonState.turn].practice(choice);
    }
}
exports.GameAutomaton = GameAutomaton;
