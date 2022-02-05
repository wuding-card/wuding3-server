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
    GameStage[GameStage["ALICE_PREPARE"] = 1] = "ALICE_PREPARE";
    GameStage[GameStage["ALICE_ACTION"] = 2] = "ALICE_ACTION";
    GameStage[GameStage["ALICE_END"] = 3] = "ALICE_END";
    GameStage[GameStage["BOB_PREPARE"] = 4] = "BOB_PREPARE";
    GameStage[GameStage["BOB_ACTION"] = 5] = "BOB_ACTION";
    GameStage[GameStage["BOB_END"] = 6] = "BOB_END";
    GameStage[GameStage["ALICE_WIN"] = 7] = "ALICE_WIN";
    GameStage[GameStage["BOB_WIN"] = 8] = "BOB_WIN";
    GameStage[GameStage["DRAW"] = 9] = "DRAW";
})(GameStage = exports.GameStage || (exports.GameStage = {}));
