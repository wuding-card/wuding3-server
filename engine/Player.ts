import { DiscardState, GameState } from "../regulates/interfaces";
import { Deck, Target } from "../regulates/types";
import { assert } from "../regulates/utils";
import { Card } from "./Card"

export class Player {
  basicState: {
    health: number,
    mana: number,
    level: number,
  };
  groundState: Record<string,Card[]>;
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
      handState: [],
    };
    this.actionState = {
      drawPerPractice: 2,
    }
    for(const i in deck) {
      this.groundState.libraryState.push(
        new Card(deck[i])
      );
    }
    this.shuffleLibrary();
    this.draw(5);
  }


  shuffleLibrary() {
    this.groundState.handState.sort((a,b) => (Math.random()-0.5));
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
        this.exhaust();
      }else{
        const nowCard = top?this.groundState.libraryState.pop():this.groundState.libraryState.shift();
        if(nowCard !== undefined) {
          this.groundState.handState.push(nowCard);
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
  alive() {
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

  discard(state: DiscardState) {
    state.sort();
    for(let i = state.length - 1; i >= 0; --i) {
      const card = this.groundState.handState.splice(state[i],1);
      assert(card.length == 1);
      card[0].turnFace(true);
      this.groundState.graveyardState.push(card[0]);
    }
  }

  search(id: number[], location: string[]): Card[]{
    const ret: Card[] = [];
    for(const i of location) {
      for(const j of this.groundState[i]) {
        for(const k of id) {
          if(j.UID == k) {
            ret.push(j);
          }
        }
      }
    }
    return ret;
  }

  cast(id: number, targets: Target[],gameState: GameState) {
    const cards = this.search([id], ["handState"]);
    const card = cards[0];
    if(card.spendCost(this)){
      card.resolve(gameState, targets);
    }
  }
}