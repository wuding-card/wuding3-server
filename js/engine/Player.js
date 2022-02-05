"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const utils_1 = require("../regulates/utils");
const Card_1 = require("./Card");
class Player {
    constructor(id, deck) {
        this.basicState = {
            health: 10,
            mana: id == 0 ? 0 : 1,
            level: id == 0 ? 0 : 1,
        };
        this.groundState = {
            sorceryState: [],
            equipmentState: [],
            zisurruState: [],
            libraryState: [],
            graveyardState: [],
            blackholeState: [],
        };
        this.handState = [];
        this.actionState = {
            drawPerPractice: 2,
        };
        for (const i in deck) {
            this.handState.push(new Card_1.Card(deck[i]));
        }
        this.shuffleLibrary();
        this.draw(5);
    }
    shuffleLibrary() {
        this.handState.sort((a, b) => (Math.random() - 0.5));
    }
    hurt(val = 1) {
        this.basicState.health -= val;
    }
    exhaust() {
        this.hurt();
    }
    draw(times = 1, top = true) {
        for (let i = 0; i < times; ++i) {
            if (this.groundState.libraryState.length == 0) {
                this.hurt();
            }
            else {
                const nowCard = top ? this.groundState.libraryState.pop() : this.groundState.libraryState.shift();
                if (nowCard !== undefined) {
                    this.handState.push(nowCard);
                }
            }
        }
    }
    levelChange(times = 1) {
        this.basicState.level += times;
    }
    practice(choice) {
        choice == 0 ? this.draw(this.actionState.drawPerPractice) : this.levelChange();
    }
    /* true means live while false means dead */
    alive() {
        return this.basicState.health >= 0;
    }
    manaRestore() {
        this.basicState.mana = Math.max(this.basicState.mana, this.basicState.level);
    }
    untapAll() {
        for (const i of this.groundState.sorceryState) {
            i.turnTap(false);
        }
        for (const i of this.groundState.zisurruState) {
            i.turnTap(false);
        }
        for (const i of this.groundState.equipmentState) {
            i.turnTap(false);
        }
        this.manaRestore();
    }
    discard(state) {
        state.sort();
        for (let i = state.length - 1; i >= 0; --i) {
            const card = this.handState.splice(state[i], 1);
            (0, utils_1.assert)(card.length == 1);
            card[0].turnFace(true);
            this.groundState.graveyardState.push(card[0]);
        }
    }
}
exports.Player = Player;
