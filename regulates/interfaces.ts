import { Card } from "../engine/Card"
import { Player } from "../engine/Player"



export enum PlayerOperation {
  PRACTICE,
  ACTION,
}

export enum GameStage {
  INIT,
  PREPARE,
  ACTION,
  END,
  AWIN,
  BWIN,
  DRAW,
}

export interface GameState {
  playerState: Player[],
  automatonState: {
    stage: GameStage,
    /* 0: Alice, 1: Bob */
    priority: number,
    turn: number,
    round: number,
    operation: PlayerOperation,
  }
}