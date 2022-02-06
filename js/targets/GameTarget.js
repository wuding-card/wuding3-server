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
    extract() {
        return [[this.player], []];
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
    extract() {
        const players = [];
        const cards = [];
        for (const i of this.targets) {
            const [nowPlayers, nowCards] = i.extract();
            players.push(...nowPlayers);
            cards.push(...nowCards);
        }
        return [players, cards];
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
