import { Card } from "../engine/Card"
import { Player } from "../engine/Player"

export enum PlayerOperation {
  NONE,
  PRACTICE,
  INSTANT_ACTION,
  FREE_ACTION,
}

export enum GameStage {
  PREPARE,
  ACTION,
  END,
}

export enum GameStep {
  GAME_START,
  UNTAP,
  TURN_START,
  PRACTICE,
  ACTION_START,
  FREE_ACTION,
  ACTION_END,
  TURN_END,
  DISCARD,
  GAME_END,
}

export enum GameResult {
  AWIN,
  BWIN,
  DRAW,
}

export enum ErrorSignal {
  DEAFULT_ERROR,
  ILLEGAL_OPERATION,
}

export enum InstantOperation {
  PASS,
  // Todo: add more instant operation
}
export enum FreeOperation {
  PASS,
  CAST,
}
export enum IterateSignalType {
  REQUEST,
  ERROR,
  GAMEEND,
}
export interface IterateSignal {
  type: IterateSignalType,
  state: [number,PlayerOperation] | ErrorSignal | GameResult,
}
export type PracticeState = number;
export interface FreeActionState {
  type: FreeOperation,
  state: null | number,
}
export interface InstantActionState {
  type: InstantOperation,
  state: null,
}
export interface PlayerSignal {
  type: PlayerOperation,
  state: null | PracticeState | FreeActionState | InstantActionState;
}

export interface GameState {
  playerState: Player[],
  automatonState: {
    stage: GameStage,
    step: GameStep,
    /* 0: Alice, 1: Bob */
    priority: number,
    turn: number,
    round: number,
  }
}