"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameStep = exports.GameStage = exports.PlayerOperation = void 0;
var PlayerOperation;
(function (PlayerOperation) {
    PlayerOperation[PlayerOperation["PRACTICE"] = 0] = "PRACTICE";
    PlayerOperation[PlayerOperation["ACTION"] = 1] = "ACTION";
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
