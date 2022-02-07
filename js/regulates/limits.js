"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimitType = void 0;
var LimitType;
(function (LimitType) {
    LimitType[LimitType["EQUAL"] = 0] = "EQUAL";
    LimitType[LimitType["LARGE"] = 1] = "LARGE";
    LimitType[LimitType["LARGE_EQUAL"] = 2] = "LARGE_EQUAL";
    LimitType[LimitType["LESS"] = 3] = "LESS";
    LimitType[LimitType["LESS_EQUAL"] = 4] = "LESS_EQUAL";
    LimitType[LimitType["NOT_EQUAL"] = 5] = "NOT_EQUAL";
    LimitType[LimitType["AND"] = 6] = "AND";
    LimitType[LimitType["OR"] = 7] = "OR";
    LimitType[LimitType["NOT"] = 8] = "NOT";
})(LimitType = exports.LimitType || (exports.LimitType = {}));
