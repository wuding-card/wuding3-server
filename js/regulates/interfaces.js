"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventItemType = exports.IterateSignalType = exports.FreeOperation = exports.InstantOperation = exports.ErrorSignal = exports.GameResult = exports.GameStep = exports.GameStage = exports.PlayerOperation = void 0;
/* ======== GameProcess And Signal ======== */
// Todo: Add DEFENSE.
var PlayerOperation;
(function (PlayerOperation) {
    PlayerOperation[PlayerOperation["NONE"] = 0] = "NONE";
    PlayerOperation[PlayerOperation["PRACTICE"] = 1] = "PRACTICE";
    PlayerOperation[PlayerOperation["INSTANT_ACTION"] = 2] = "INSTANT_ACTION";
    PlayerOperation[PlayerOperation["FREE_ACTION"] = 3] = "FREE_ACTION";
    PlayerOperation[PlayerOperation["ATTACK"] = 4] = "ATTACK";
    PlayerOperation[PlayerOperation["BLOCK"] = 5] = "BLOCK";
    PlayerOperation[PlayerOperation["DISCARD"] = 6] = "DISCARD";
})(PlayerOperation = exports.PlayerOperation || (exports.PlayerOperation = {}));
var GameStage;
(function (GameStage) {
    GameStage[GameStage["PREPARE"] = 0] = "PREPARE";
    GameStage[GameStage["BATTLE"] = 1] = "BATTLE";
    GameStage[GameStage["ACTION"] = 2] = "ACTION";
    GameStage[GameStage["END"] = 3] = "END";
})(GameStage = exports.GameStage || (exports.GameStage = {}));
var GameStep;
(function (GameStep) {
    GameStep[GameStep["GAME_START"] = 0] = "GAME_START";
    GameStep[GameStep["UNTAP"] = 1] = "UNTAP";
    GameStep[GameStep["TURN_START"] = 2] = "TURN_START";
    GameStep[GameStep["PRACTICE"] = 3] = "PRACTICE";
    GameStep[GameStep["BATTLE_START"] = 4] = "BATTLE_START";
    GameStep[GameStep["ATTACK"] = 5] = "ATTACK";
    GameStep[GameStep["ACTION_START"] = 6] = "ACTION_START";
    GameStep[GameStep["FREE_ACTION"] = 7] = "FREE_ACTION";
    GameStep[GameStep["TURN_END"] = 8] = "TURN_END";
    GameStep[GameStep["DISCARD"] = 9] = "DISCARD";
    GameStep[GameStep["GAME_END"] = 10] = "GAME_END";
})(GameStep = exports.GameStep || (exports.GameStep = {}));
var GameResult;
(function (GameResult) {
    GameResult[GameResult["AWIN"] = 0] = "AWIN";
    GameResult[GameResult["BWIN"] = 1] = "BWIN";
    GameResult[GameResult["DRAW"] = 2] = "DRAW";
})(GameResult = exports.GameResult || (exports.GameResult = {}));
/*
DEFAULT_ERROR: An error that won't happen, or can't be expected.
ILLEGAL_OPERATION: An operation with illegal type.
FUTURE_FEATURE: This error happens because it used a feature that hasn't been deployed completely.
*/
var ErrorSignal;
(function (ErrorSignal) {
    ErrorSignal[ErrorSignal["DEAFULT_ERROR"] = 0] = "DEAFULT_ERROR";
    ErrorSignal[ErrorSignal["ILLEGAL_OPERATION"] = 1] = "ILLEGAL_OPERATION";
    ErrorSignal[ErrorSignal["FUTURE_FEATURE"] = 2] = "FUTURE_FEATURE";
})(ErrorSignal = exports.ErrorSignal || (exports.ErrorSignal = {}));
var InstantOperation;
(function (InstantOperation) {
    InstantOperation[InstantOperation["PASS"] = 0] = "PASS";
    // Todo: add more instant operation
})(InstantOperation = exports.InstantOperation || (exports.InstantOperation = {}));
var FreeOperation;
(function (FreeOperation) {
    FreeOperation[FreeOperation["PASS"] = 0] = "PASS";
    FreeOperation[FreeOperation["CAST"] = 1] = "CAST";
})(FreeOperation = exports.FreeOperation || (exports.FreeOperation = {}));
var IterateSignalType;
(function (IterateSignalType) {
    IterateSignalType[IterateSignalType["REQUEST"] = 0] = "REQUEST";
    IterateSignalType[IterateSignalType["ERROR"] = 1] = "ERROR";
    IterateSignalType[IterateSignalType["GAME_END"] = 2] = "GAME_END";
})(IterateSignalType = exports.IterateSignalType || (exports.IterateSignalType = {}));
;
;
var EventItemType;
(function (EventItemType) {
    EventItemType[EventItemType["EVENT"] = 0] = "EVENT";
    EventItemType[EventItemType["IMMEDIATE"] = 1] = "IMMEDIATE";
})(EventItemType = exports.EventItemType || (exports.EventItemType = {}));
