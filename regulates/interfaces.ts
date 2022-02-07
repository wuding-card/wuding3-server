import { Card } from "../engine/Card"
import { EventStack } from "../engine/EventStack";
import { Player } from "../engine/Player"
import { GameEvent } from "../events/GameEvent";
import { Limit } from "./limits";
import { Target } from "./types";

/* ======== GameProcess And Signal ======== */

// Todo: Add DEFENSE.
export enum PlayerOperation {
  NONE,
  PRACTICE,
  INSTANT_ACTION,
  FREE_ACTION,
  ATTACK,
  BLOCK,
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
export type FreeActionState = {
  type: FreeOperation.PASS,
  state: null,
} | {
  type: FreeOperation.CAST,
  state: [number,Target[]],
}
export interface InstantActionState {
  type: InstantOperation,
  state: null,
}
export type DiscardState = number[];
export interface AttackState {};
export interface BlockState {};

export type PlayerSignal = {
  type: PlayerOperation.NONE,
  state: null,
} | {
  type: PlayerOperation.PRACTICE,
  state: PracticeState,
} | {
  type: PlayerOperation.FREE_ACTION,
  state: FreeActionState,
} | {
  type: PlayerOperation.INSTANT_ACTION,
  state: InstantActionState,
} | {
  type: PlayerOperation.ATTACK,
  state: AttackState,
} | {
  type: PlayerOperation.BLOCK,
  state: BlockState,
} | {
  type: PlayerOperation.DISCARD,
  state: DiscardState,
} 

/* ======== GameState ======== */

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
  targets: Target[],
  container: GameEvent | Card,
}

/* ======== CardState ======== */

export type CostInfo = {
  type: "mana",
  value: number,
}

export interface CastInfo {
  castCost: CostInfo[],
  resolveEvent: {
    events: GameEvent[],
  }
}