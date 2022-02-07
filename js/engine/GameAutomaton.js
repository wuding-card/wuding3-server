"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameAutomaton = void 0;
const interfaces_js_1 = require("../regulates/interfaces.js");
const utils_js_1 = require("../regulates/utils.js");
const EventStack_js_1 = require("./EventStack.js");
const Player_js_1 = require("./Player.js");
const DEAFULT_ERROR = { type: interfaces_js_1.IterateSignalType.ERROR, state: interfaces_js_1.ErrorSignal.DEAFULT_ERROR };
const ILLEGAL_OPERATION = { type: interfaces_js_1.IterateSignalType.ERROR, state: interfaces_js_1.ErrorSignal.ILLEGAL_OPERATION };
const FUTURE_FEATURE = { type: interfaces_js_1.IterateSignalType.ERROR, state: interfaces_js_1.ErrorSignal.FUTURE_FEATURE };
const expectedOperation = {
    0: interfaces_js_1.PlayerOperation.NONE,
    1: interfaces_js_1.PlayerOperation.NONE,
    2: interfaces_js_1.PlayerOperation.INSTANT_ACTION,
    3: interfaces_js_1.PlayerOperation.PRACTICE,
    4: interfaces_js_1.PlayerOperation.INSTANT_ACTION,
    5: interfaces_js_1.PlayerOperation.ATTACK,
    6: interfaces_js_1.PlayerOperation.INSTANT_ACTION,
    7: interfaces_js_1.PlayerOperation.FREE_ACTION,
    8: interfaces_js_1.PlayerOperation.INSTANT_ACTION,
    9: interfaces_js_1.PlayerOperation.DISCARD,
    10: interfaces_js_1.PlayerOperation.NONE,
};
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
            },
        };
        this.stack = new EventStack_js_1.EventStack(this.gameState);
    }
    requestGenerator(op) {
        return { type: interfaces_js_1.IterateSignalType.REQUEST, state: [this.gameState.automatonState.priority, op] };
    }
    iterate(signal) {
        let ret = this.__iterate(signal);
        const playerState = this.gameState.playerState;
        if (!playerState[0].alive() || !playerState[1].alive()) {
            ret = { type: interfaces_js_1.IterateSignalType.GAME_END, state: (playerState[0].alive() != playerState[1].alive() ? playerState[0].alive() ? interfaces_js_1.GameResult.AWIN : interfaces_js_1.GameResult.BWIN : interfaces_js_1.GameResult.DRAW) };
        }
        return ret;
    }
    __iterate(signal) {
        const automatonState = this.gameState.automatonState;
        const playerState = this.gameState.playerState;
        switch (automatonState.step) {
            case interfaces_js_1.GameStep.GAME_START:
                {
                    automatonState.round = 1;
                    automatonState.step = interfaces_js_1.GameStep.UNTAP;
                    return this.requestGenerator(interfaces_js_1.PlayerOperation.NONE);
                }
                ;
            case interfaces_js_1.GameStep.UNTAP:
                {
                    playerState[automatonState.turn].untapAll();
                    return this.requestGenerator(interfaces_js_1.PlayerOperation.INSTANT_ACTION);
                }
                ;
            case interfaces_js_1.GameStep.TURN_START:
            case interfaces_js_1.GameStep.BATTLE_START:
            case interfaces_js_1.GameStep.ACTION_START:
            case interfaces_js_1.GameStep.TURN_END:
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
                                        if (this.stack.empty()) {
                                            ++automatonState.step;
                                            return this.requestGenerator(expectedOperation[automatonState.step]);
                                        }
                                        else {
                                            return FUTURE_FEATURE;
                                        }
                                    }
                                    else {
                                        automatonState.priority ^= 1;
                                        return this.requestGenerator(interfaces_js_1.PlayerOperation.INSTANT_ACTION);
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
                    automatonState.stage = interfaces_js_1.GameStage.BATTLE;
                    // Todo: Change it into BATTLE
                    return this.requestGenerator(interfaces_js_1.PlayerOperation.INSTANT_ACTION);
                }
            }
            case interfaces_js_1.GameStep.ATTACK: {
                ++automatonState.stage;
                ++automatonState.step;
                return this.requestGenerator(expectedOperation[automatonState.step]);
            }
            case interfaces_js_1.GameStep.FREE_ACTION: {
                (0, utils_js_1.assert)(automatonState.priority == automatonState.turn);
                if (signal.type == interfaces_js_1.PlayerOperation.FREE_ACTION) {
                    const state = signal.state;
                    switch (state.type) {
                        case interfaces_js_1.FreeOperation.PASS:
                            {
                                automatonState.step = interfaces_js_1.GameStep.TURN_END;
                                automatonState.stage = interfaces_js_1.GameStage.END;
                                return this.requestGenerator(interfaces_js_1.PlayerOperation.INSTANT_ACTION);
                            }
                            ;
                        case interfaces_js_1.FreeOperation.CAST: {
                            // Todo: Actions should enter stack.
                            // Todo: Refactor this.
                            playerState[automatonState.turn].cast(state.state[0], state.state[1], this.gameState);
                            return this.requestGenerator(interfaces_js_1.PlayerOperation.FREE_ACTION);
                        }
                        default: {
                            return DEAFULT_ERROR;
                        }
                    }
                }
                else if (signal.type == interfaces_js_1.PlayerOperation.INSTANT_ACTION) {
                    // Todo: Add support of instantAction
                    return FUTURE_FEATURE;
                }
                else {
                    return ILLEGAL_OPERATION;
                }
            }
            case interfaces_js_1.GameStep.DISCARD: {
                if (signal.type == interfaces_js_1.PlayerOperation.DISCARD) {
                    const state = signal.state;
                    playerState[automatonState.turn].discard(state);
                    automatonState.stage = interfaces_js_1.GameStage.PREPARE;
                    automatonState.step = interfaces_js_1.GameStep.UNTAP;
                    if (automatonState.turn == 1) {
                        ++automatonState.round;
                    }
                    automatonState.turn ^= 1;
                    automatonState.priority = automatonState.turn;
                    return this.requestGenerator(interfaces_js_1.PlayerOperation.NONE);
                }
                else {
                    return ILLEGAL_OPERATION;
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
