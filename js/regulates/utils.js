"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = exports.LevelID = exports.TypeID = exports.SectID = exports.cardLib = void 0;
const cards_json_1 = __importDefault(require("../assets/lib/cards.json"));
exports.cardLib = cards_json_1.default;
exports.SectID = {
    "通用": 0,
    "奔雷": 1,
    "焚金": 2,
    "焚天": 3,
    "光华": 4,
    "飘渺": 5,
    "天灵": 6,
    "万法": 7,
    "元力": 8,
};
exports.TypeID = {
    "万物": 0,
    "即时": 1,
    "触发": 2,
    "持续": 3,
    "法阵": 4,
    "攻击": 5,
    "防御": 6,
    "法器": 7,
};
exports.LevelID = {
    "凡人": 0,
    "炼气": 1,
    "筑基": 2,
    "金丹": 3,
    "元神": 4,
    "炼虚": 5,
    "涅槃": 6,
    "逍遥": 7,
};
function assert(condition) {
    if (!condition) {
        throw new Error("VITAL_ERROR: Unmatched Assertion");
    }
}
exports.assert = assert;
