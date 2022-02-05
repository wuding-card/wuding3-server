import { GameStage, GameState, PlayerOperation } from "../regulates/interfaces.js";
import { Deck } from "../regulates/types.js";
import { Card } from "./Card.js";
import { Player } from "./Player.js";

export class GameAutomaton {
  gameState: GameState;
  constructor(deck: Array<Deck>){
    this.gameState = {
      playerState: [new Player(0,deck[0]),new Player(1,deck[1])],
      automatonState: {
        stage: GameStage.INIT,
        /* 0: Alice, 1: Bob */
        priority: 0,
        turn: 0,
        round: 0,
        operation: PlayerOperation.PRACTICE,
      }
    }
  }

  practice(choice: number) {
    this.gameState.playerState[this.gameState.automatonState.turn].practice(choice);
  }
}