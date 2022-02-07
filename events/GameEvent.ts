import { GameState } from "../regulates/interfaces";
import { Target } from "../regulates/types";

export abstract class GameEvent {
  abstract resolve(gameState: GameState,targets: Target[]): void;
}

export class DealDamage extends GameEvent {
  amount: number;
  constructor(amount: number) {
    super();
    this.amount = amount;
  }
  resolve(gameState: GameState,targets: Target[]): void {
    const players = targets[0][0];
    if(players.length > 0) {
      for(const i of players) {
        gameState.playerState[i].basicState.health -= this.amount;
      }
    }
  }
}

export class MyErrorEvent extends GameEvent {
  message: string;
  constructor(message: string) {
    super();
    this.message = message;
  }
  resolve(gameState: GameState, targets: Target[]): void {
    throw new Error(this.message);
  }
}