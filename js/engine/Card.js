"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const resources_1 = require("../regulates/resources");
const utils_1 = require("../regulates/utils");
class Card {
    constructor(name) {
        const card = resources_1.cardLib[name];
        this.name = name;
        this.counter = {};
        this.attribute = {};
        this.tapped = false;
        this.faceup = false;
        this.sectID = resources_1.SectID[card["sect"]];
        this.typeID = resources_1.TypeID[card["type"]];
        this.level = resources_1.LevelID[card["level"]];
        this.rarity = card["rarity"];
        this.UID = utils_1.CardUID.get();
        for (const i of ["power", "defense", 'durability', 'castCost', 'maintainCost']) {
            if (card.attribute[i] != "") {
                this.attribute[i] = card.attribute[i];
            }
        }
        this.cast = (0, utils_1.castAnalyze)(card.cast);
    }
    turnFace(face) {
        this.faceup = face;
    }
    turnTap(tap) {
        this.tapped = tap;
    }
    spendCost(player) {
        for (const i of this.cast.castCost) {
            switch (i.type) {
                case "mana": {
                    if (!(player.basicState.mana >= i.value)) {
                        return false;
                    }
                    else {
                        player.basicState.mana -= i.value;
                    }
                    break;
                }
                default: {
                    return false;
                }
            }
        }
        return true;
    }
    onResolve(gameState, targets) {
        for (const i of this.cast.resolveEvent.events) {
            i.resolve(gameState, targets);
        }
    }
}
exports.Card = Card;
