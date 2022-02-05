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
        /* true: Alice, false: Bob */
        priority: 0,
        operation: PlayerOperation.PRACTICE,
      }
    }
  }

  

  practice(choice: number) {
    
  }
}