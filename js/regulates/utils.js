"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.castAnalyze = exports.CardUID = exports.assert = void 0;
function assert(condition) {
    if (!condition) {
        throw new Error("VITAL_ERROR: Unmatched Assertion");
    }
}
exports.assert = assert;
class CardUIDManager {
    constructor() {
        this.count = 0;
    }
    get() {
        return ++this.count;
    }
}
exports.CardUID = new CardUIDManager();
function castAnalyze(castInfo) {
    const ret = {
        castCost: [],
        resolveEvent: {
            events: [],
        }
    };
    for (const i in castInfo.castCost) {
        const cost = {
            type: i,
            value: castInfo.castCost[i]
        };
        ret.castCost.push(cost);
    }
    return ret;
}
exports.castAnalyze = castAnalyze;
