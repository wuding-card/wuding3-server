import { GameState } from "../regulates/interfaces";

export abstract class GameEvent {
  abstract resolve(gameState: GameState): void;
}