"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IterateSignalType = exports.FreeOperation = exports.InstantOperation = exports.ErrorSignal = exports.GameResult = exports.GameStep = exports.GameStage = exports.PlayerOperation = void 0;
var PlayerOperation;
(function (PlayerOperation) {
    PlayerOperation[PlayerOperation["NONE"] = 0] = "NONE";
    PlayerOperation[PlayerOperation["PRACTICE"] = 1] = "PRACTICE";
    PlayerOperation[PlayerOperation["INSTANT_ACTION"] = 2] = "INSTANT_ACTION";
    PlayerOperation[PlayerOperation["FREE_ACTION"] = 3] = "FREE_ACTION";
})(PlayerOperation = exports.PlayerOperation || (exports.PlayerOperation = {}));
var GameStage;
(function (GameStage) {
    GameStage[GameStage["PREPARE"] = 0] = "PREPARE";
    GameStage[GameStage["ACTION"] = 1] = "ACTION";
    GameStage[GameStage["END"] = 2] = "END";
})(GameStage = exports.GameStage || (exports.GameStage = {}));
var GameStep;
(function (GameStep) {
    GameStep[GameStep["GAME_START"] = 0] = "GAME_START";
    GameStep[GameStep["UNTAP"] = 1] = "UNTAP";
    GameStep[GameStep["TURN_START"] = 2] = "TURN_START";
    GameStep[GameStep["PRACTICE"] = 3] = "PRACTICE";
    GameStep[GameStep["ACTION_START"] = 4] = "ACTION_START";
    GameStep[GameStep["FREE_ACTION"] = 5] = "FREE_ACTION";
    GameStep[GameStep["ACTION_END"] = 6] = "ACTION_END";
    GameStep[GameStep["TURN_END"] = 7] = "TURN_END";
    GameStep[GameStep["DISCARD"] = 8] = "DISCARD";
    GameStep[GameStep["GAME_END"] = 9] = "GAME_END";
})(GameStep = exports.GameStep || (exports.GameStep = {}));
var GameResult;
(function (GameResult) {
    GameResult[GameResult["AWIN"] = 0] = "AWIN";
    GameResult[GameResult["BWIN"] = 1] = "BWIN";
    GameResult[GameResult["DRAW"] = 2] = "DRAW";
})(GameResult = exports.GameResult || (exports.GameResult = {}));
var ErrorSignal;
(function (ErrorSignal) {
    ErrorSignal[ErrorSignal["DEAFULT_ERROR"] = 0] = "DEAFULT_ERROR";
    ErrorSignal[ErrorSignal["ILLEGAL_OPERATION"] = 1] = "ILLEGAL_OPERATION";
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
    IterateSignalType[IterateSignalType["GAMEEND"] = 2] = "GAMEEND";
})(IterateSignalType = exports.IterateSignalType || (exports.IterateSignalType = {}));
