import { GameStage, GameState, GameStep, PlayerOperation } from "../regulates/interfaces.js";
import { Deck } from "../regulates/types.js";
import { Card } from "./Card.js";
import { Player } from "./Player.js";

export class GameAutomaton {
  gameState: GameState;
  constructor(deck: Array<Deck>){
    this.gameState = {
      playerState: [new Player(0,deck[0]),new Player(1,deck[1])],
      automatonState: {
        stage: GameStage.PREPARE,
        step: GameStep.GAME_START,
        /* 0: Alice, 1: Bob */
        priority: 0,
        turn: 0,
        round: 0,
      }
    }
  }

  iterate(signal: any) {
    switch(this.gameState.automatonState.step) {
      case GameStep.GAME_START: {
        
        break;
      };
      case GameStep.UNTAP: {
        
        break;
      };
    }
  }

  practice(choice: number) {
    this.gameState.playerState[this.gameState.automatonState.turn].practice(choice);
  }
}