import { Card } from "../engine/Card"
import { EventStack } from "../engine/EventStack";
import { Player } from "../engine/Player"
import { GameEvent } from "../events/GameEvent";
import { GameTarget } from "../targets/GameTarget";

// Todo: Add DEFENSE.
export enum PlayerOperation {
  NONE,
  PRACTICE,
  INSTANT_ACTION,
  FREE_ACTION,
  ATTACK,
  DISCARD,
}

export enum GameStage {
  PREPARE,
  BATTLE,
  ACTION,
  END,
}

export enum GameStep {
  GAME_START,
  UNTAP,
  TURN_START,
  PRACTICE,
  BATTLE_START,
  ATTACK,
  ACTION_START,
  FREE_ACTION,
  TURN_END,
  DISCARD,
  GAME_END,
}

export enum GameResult {
  AWIN,
  BWIN,
  DRAW,
}

/* 
DEFAULT_ERROR: An error that won't happen, or can't be expected.
ILLEGAL_OPERATION: An operation with illegal type.
FUTURE_FEATURE: This error happens because it used a feature that hasn't been deployed completely.
*/

export enum ErrorSignal {
  DEAFULT_ERROR,
  ILLEGAL_OPERATION,
  FUTURE_FEATURE,
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
  GAME_END,
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
export type DiscardState = number[];
export interface PlayerSignal {
  type: PlayerOperation,
  state: null | PracticeState | FreeActionState | InstantActionState | DiscardState;
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

export enum EventItemType {
  EVENT,
  IMMEDIATE,
}

export interface EventItem {
  type: EventItemType,
  target: GameTarget,
  container: GameEvent | Card,
}