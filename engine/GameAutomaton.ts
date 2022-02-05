import { CardState, GameStage, GameState, PlayerOperation } from "../regulates/interfaces.js";
import { Deck } from "../regulates/types.js";
import { cardInit } from "../regulates/utils.js";

export class GameAutomaton {
  gameState: GameState;
  constructor(deck: Deck[]){
    this.gameState = {
      playerState: [
        // Alice
        {
          basicState: {
            health: 10,
            mana: 0,
            level: 0,
          },
          groundState: {
            sorceryState: [],
            equipmentState: [],
            zisurruState: [],
            libraryState: [],
            graveyardState: [],
            blackholeState: [],
          },
          handState: [],
          actionState: {
            drawPerPractice: 2,
          }
        },
        // Bob
        {
          basicState: {
            health: 10,
            mana: 1,
            level: 1,
          },
          groundState: {
            sorceryState: [],
            equipmentState: [],
            zisurruState: [],
            libraryState: [],
            graveyardState: [],
            blackholeState: [],
          },
          handState: [],
          actionState: {
            drawPerPractice: 2,
          }
        }
      ],
      automatonState: {
        stage: GameStage.INIT,
        /* true: Alice, false: Bob */
        priority: 0,
        operation: PlayerOperation.PRACTICE,
      }
    }
    for(const i in deck) {
      for(const j in deck[i]) {
        this.gameState.playerState[i].handState.push(cardInit(deck[i][j]));
      }
      this.shuffleLibrary(1);
    }
    
  }

  shuffleLibrary(x: number) {
    this.gameState.playerState[x].handState.sort((a,b) => (Math.random()-0.5));
  }

  practice(choice: number) {

  }
}