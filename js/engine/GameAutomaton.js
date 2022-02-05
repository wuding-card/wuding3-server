"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameAutomaton = void 0;
const interfaces_js_1 = require("../regulates/interfaces.js");
const Player_js_1 = require("./Player.js");
const DEAFULT_ERROR = { type: interfaces_js_1.IterateSignalType.ERROR, state: interfaces_js_1.ErrorSignal.DEAFULT_ERROR };
const ILLEGAL_OPERATION = { type: interfaces_js_1.IterateSignalType.ERROR, state: interfaces_js_1.ErrorSignal.ILLEGAL_OPERATION };
function requestGenerator(id, op) {
    return { type: interfaces_js_1.IterateSignalType.REQUEST, state: [id, op] };
}
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
        const automatonState = this.gameState.automatonState;
        const playerState = this.gameState.playerState;
        switch (automatonState.step) {
            case interfaces_js_1.GameStep.GAME_START:
                {
                    automatonState.round = 1;
                    automatonState.step = interfaces_js_1.GameStep.UNTAP;
                    return requestGenerator(automatonState.priority, interfaces_js_1.PlayerOperation.NONE);
                }
                ;
            case interfaces_js_1.GameStep.UNTAP:
                {
                    playerState[automatonState.turn].untapAll();
                    return requestGenerator(automatonState.priority, interfaces_js_1.PlayerOperation.INSTANT_ACTION);
                }
                ;
            case interfaces_js_1.GameStep.TURN_START:
                {
                    if (signal.type != interfaces_js_1.PlayerOperation.INSTANT_ACTION) {
                        return ILLEGAL_OPERATION;
                    }
                    else {
                        const state = signal.state;
                        switch (state.type) {
                            case interfaces_js_1.InstantOperation.PASS:
                                {
                                    if (automatonState.priority != automatonState.turn) {
                                        automatonState.priority ^= 1;
                                        automatonState.step = interfaces_js_1.GameStep.PRACTICE;
                                        return requestGenerator(automatonState.priority, interfaces_js_1.PlayerOperation.PRACTICE);
                                    }
                                    else {
                                        automatonState.priority ^= 1;
                                        return requestGenerator(automatonState.priority, interfaces_js_1.PlayerOperation.INSTANT_ACTION);
                                    }
                                }
                                ;
                            default:
                                {
                                    return DEAFULT_ERROR;
                                }
                                ;
                        }
                    }
                }
                ;
            case interfaces_js_1.GameStep.PRACTICE: {
                if (signal.type != interfaces_js_1.PlayerOperation.PRACTICE) {
                    return ILLEGAL_OPERATION;
                }
                else {
                    const state = signal.state;
                    playerState[automatonState.turn].practice(state);
                    automatonState.step = interfaces_js_1.GameStep.ACTION_START;
                    // Todo: Change it into BATTLE
                    return requestGenerator(automatonState.priority, interfaces_js_1.PlayerOperation.INSTANT_ACTION);
                }
            }
            default: {
                return DEAFULT_ERROR;
            }
        }
    }
    practice(choice) {
        this.gameState.playerState[this.gameState.automatonState.turn].practice(choice);
    }
}
exports.GameAutomaton = GameAutomaton;
