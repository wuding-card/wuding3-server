import { GameState } from "../regulates/interfaces";
import { Target } from "../regulates/types";

export abstract class GameEvent {
  abstract resolve(gameState: GameState,targets: Target[]): void;
}

export class DealDamage extends GameEvent {
  resolve(gameState: GameState,targets: Target[]): void {
    gameState
  }
}