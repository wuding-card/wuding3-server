import { cardLib, LevelID, SectID, TypeID } from "../regulates/utils";

export class Card {
  name: string;
  counter: Record<string,number>;
  tapped: boolean;
  faceup: boolean;
  attribute: Record<string, number>;
  sectID: number;
  level: number;
  typeID: number;
  rarity: number;
  
  constructor(name: string) {
    const card = cardLib[name];
    this.name = name;
    this.counter = {};
    this.attribute = {};
    this.tapped = false;
    this.faceup = false;
    this.sectID = SectID[card["sect"]];
    this.typeID = TypeID[card["type"]];
    this.level = LevelID[card["level"]];
    this.rarity = card["rarity"];
    for(const i of ["power","defense",'durability','castCost','maintainCost']){
      if(card[i] != ""){
        this.attribute[i]=card[i];
      }
    }
  }

  turnFace(face: boolean) {
    this.faceup = face;
  }
}