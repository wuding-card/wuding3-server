import { Card } from "../engine/Card"

export interface PlayerState {
  basicState: {
    health: number,
    mana: number,
    level: number,
  },
  groundState: {
    sorceryState: Card[],
    equipmentState: Card[],
    zisurruState: Card[],
    libraryState: Card[],
    graveyardState: Card[],
    blackholeState: Card[],
  },
  handState: Card[],
  actionState: {
    drawPerPractice: number,
  }
}

export enum PlayerOperation {
  PRACTICE,
  ACTION,
}

export enum GameStage {
  INIT,
  ALICE_PREPARE,
  ALICE_ACTION,
  ALICE_END,
  BOB_PREPARE,
  BOB_ACTION,
  BOB_END,
  ALICE_WIN,
  BOB_WIN,
  DRAW,
}

export interface GameState {
  playerState: PlayerState[],
  automatonState: {
    stage: GameStage,
    /* 0: Alice, 1: Bob */
    priority: number,
    operation: PlayerOperation,
  }
}