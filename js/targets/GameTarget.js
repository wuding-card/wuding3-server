"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnionTarget = exports.PlayerTarget = exports.GameTarget = void 0;
class GameTarget {
}
exports.GameTarget = GameTarget;
class PlayerTarget extends GameTarget {
    constructor(player) {
        super();
        this.player = player;
    }
    legal() {
        return true;
    }
}
exports.PlayerTarget = PlayerTarget;
class UnionTarget extends GameTarget {
    constructor(...targets) {
        super();
        this.targets = targets;
    }
    legal() {
        let ret = false;
        for (const i of this.targets) {
            ret = ret || i.legal();
        }
        return ret;
    }
}
exports.UnionTarget = UnionTarget;
