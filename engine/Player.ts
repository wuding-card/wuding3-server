import { Deck } from "../regulates/types";
import { Card } from "./Card"

export class Player {
  basicState: {
    health: number,
    mana: number,
    level: number,
  };
  groundState: {
    sorceryState: Card[],
    equipmentState: Card[],
    zisurruState: Card[],
    libraryState: Card[],
    graveyardState: Card[],
    blackholeState: Card[],
  };
  handState: Card[];
  actionState: {
    drawPerPractice: number,
  };
  constructor(id: number, deck: Deck) {
    this.basicState = {
      health: 10,
      mana: id == 0? 0: 1,
      level: id == 0? 0: 1,
    };
    this.groundState = {
      sorceryState: [],
      equipmentState: [],
      zisurruState: [],
      libraryState: [],
      graveyardState: [],
      blackholeState: [],
    };
    this.handState =  [];
    this.actionState = {
      drawPerPractice: 2,
    }
    for(const i in deck) {
      this.handState.push(
        new Card(deck[i])
      );
    }
    this.shuffleLibrary();
    this.draw(5);
  }


  shuffleLibrary() {
    this.handState.sort((a,b) => (Math.random()-0.5));
  }

  hurt(val: number = 1) {
    this.basicState.health -= val;
  }

  exhaust() {
    this.hurt();
  }

  draw(times: number = 1, top: boolean = true) {
    for(let i = 0; i < times; ++i) {
      if(this.groundState.libraryState.length == 0) {
        this.hurt();
      }else{
        const nowCard = top?this.groundState.libraryState.pop():this.groundState.libraryState.shift();
        if(nowCard !== undefined) {
          this.handState.push(nowCard);
        }
      }
    }
  }

  levelChange(times: number = 1) {
    this.basicState.level += times;
  }

  practice(choice: number) {
    choice == 0? this.draw(this.actionState.drawPerPractice): this.levelChange();
  }

  /* true means live while false means dead */
  stateCheck() {
    return this.basicState.health >= 0;
  }

  manaRestore() {
    this.basicState.mana = Math.max(this.basicState.mana,this.basicState.level);
  }

  untapAll() {
    for(const i of this.groundState.sorceryState) {
      i.turnTap(false);
    }
    for(const i of this.groundState.zisurruState) {
      i.turnTap(false);
    }
    for(const i of this.groundState.equipmentState) {
      i.turnTap(false);
    }
    this.manaRestore();
  }
}