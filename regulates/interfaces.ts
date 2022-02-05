import { Card } from "../engine/Card"
import { Player } from "../engine/Player"



export enum PlayerOperation {
  PRACTICE,
  ACTION,
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