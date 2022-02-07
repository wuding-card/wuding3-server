import { CastInfo, GameState } from "../regulates/interfaces";
import { cardLib, SectID, TypeID, LevelID } from "../regulates/resources";
import { Target } from "../regulates/types";
import { CardUID, castAnalyze } from "../regulates/utils";
import { Player } from "./Player";

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
  UID: number;
  cast: CastInfo;
  
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
    this.UID = CardUID.get();
    for(const i of ["power","defense",'durability','castCost','maintainCost']){
      if(card.attribute[i] != ""){
        this.attribute[i]=card.attribute[i];
      }
    }
    this.cast = castAnalyze(card.cast);
  }

  turnFace(face: boolean) {
    this.faceup = face;
  }

  turnTap(tap: boolean) {
    this.tapped = tap;
  }

  spendCost(player: Player): boolean {
    for(const i of this.cast.castCost) {
      switch(i.type) {
        case "mana": {
          if(! (player.basicState.mana >= i.value)) {
            return false;
          } else {
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

  resolve(gameState: GameState, targets: Target[]) {
    for(const i of this.cast.resolveEvent.events) {
      i.resolve(gameState, targets);
    }
  }
}