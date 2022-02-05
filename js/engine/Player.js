"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
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
}
exports.Player = Player;
