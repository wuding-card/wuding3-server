"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const utils_1 = require("../regulates/utils");
class Card {
    constructor(name) {
        const card = utils_1.cardLib[name];
        this.name = name;
        this.counter = {};
        this.attribute = {};
        this.tapped = false;
        this.faceup = false;
        this.sectID = utils_1.SectID[card["sect"]];
        this.typeID = utils_1.TypeID[card["type"]];
        this.level = utils_1.LevelID[card["level"]];
        this.rarity = card["rarity"];
        for (const i of ["power", "defense", 'durability', 'castCost', 'maintainCost']) {
            if (card[i] != "") {
                this.attribute[i] = card[i];
            }
        }
    }
    turnFace(face) {
        this.faceup = face;
    }
}
exports.Card = Card;
