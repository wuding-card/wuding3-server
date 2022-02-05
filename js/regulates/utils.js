import cardJSON from '../assets/lib/cards.json';
const cardLib = cardJSON;
export const SectID = {
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
export const TypeID = {
    "万物": 0,
    "即时": 1,
    "触发": 2,
    "持续": 3,
    "法阵": 4,
    "攻击": 5,
    "防御": 6,
    "法器": 7,
};
export const LevelID = {
    "凡人": 0,
    "炼气": 1,
    "筑基": 2,
    "金丹": 3,
    "元神": 4,
    "炼虚": 5,
    "涅槃": 6,
    "逍遥": 7,
};
export function cardInit(name) {
    const card = cardLib[name];
    let ret = {
        name: name,
        counter: {},
        attribute: {},
        tapped: false,
        faceup: true,
        sectID: SectID[card["sect"]],
        typeID: TypeID[card["type"]],
        level: LevelID[card["level"]],
        rarity: card["rarity"],
    };
    for (const i of ["power", "defense", 'durability', 'castCost', 'maintainCost']) {
        if (card[i] != "") {
            ret.attribute[i] = card[i];
        }
    }
    return ret;
}
