"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameStage = exports.PlayerOperation = void 0;
var PlayerOperation;
(function (PlayerOperation) {
    PlayerOperation[PlayerOperation["PRACTICE"] = 0] = "PRACTICE";
    PlayerOperation[PlayerOperation["ACTION"] = 1] = "ACTION";
})(PlayerOperation = exports.PlayerOperation || (exports.PlayerOperation = {}));
var GameStage;
(function (GameStage) {
    GameStage[GameStage["INIT"] = 0] = "INIT";
    GameStage[GameStage["PREPARE"] = 1] = "PREPARE";
    GameStage[GameStage["ACTION"] = 2] = "ACTION";
    GameStage[GameStage["END"] = 3] = "END";
    GameStage[GameStage["AWIN"] = 4] = "AWIN";
    GameStage[GameStage["BWIN"] = 5] = "BWIN";
    GameStage[GameStage["DRAW"] = 6] = "DRAW";
})(GameStage = exports.GameStage || (exports.GameStage = {}));
