import { CastInfo, GameState, Target, TargetSet, TargetSets } from "../regulates/interfaces";
import { cardLib, SectID, TypeID, LevelID } from "../regulates/resources";
import { CardUID, castAnalyze } from "../regulates/utils";
import { logger } from "../tools/Logger";
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

  staticEffect: {
    resolveEndPlace: {
      place: string,
      shuffle: boolean,
    }
  }
  
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
    this.staticEffect = {
      resolveEndPlace: {
        place: "graveyardState",
        shuffle: false,
      }
    }
    if(card?.staticEffect?.resolveEndPlace != null){
      this.staticEffect.resolveEndPlace = card.staticEffect.resolveEndPlace
    };
  }

  turnFace(face: boolean) {
    this.faceup = face;
  }

  turnTap(tap: boolean) {
    this.tapped = tap;
  }

  checkLevel(player: Player): boolean {
    return this.level <= player.basicState.level;
  }

  checkCost(player: Player): boolean {
    for(const i of this.cast.castCost) {
      switch(i.type) {
        case "mana": {
          if(! (player.basicState.mana >= i.value)) {
            return false;
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

  spendCost(player: Player) {
    for(const i of this.cast.castCost) {
      switch(i.type) {
        case "mana": {
          player.basicState.mana -= i.value
          break;
        }
        default: {
          return;
        }
      }
    }
  }

  resolve(owner: number, gameState: GameState, targets: TargetSets) {
    for(const i of this.cast.resolveEvent.events) {
      logger.silly("Card event happened by %s target on: %s", owner, targets);
      i.resolve(owner, gameState, targets);
    }
    gameState.playerState[owner].moveCard("handState", this.staticEffect.resolveEndPlace.place, this.UID, this.staticEffect.resolveEndPlace.shuffle);
  }
}