import { ErrorSignal, GameStage, GameState, GameStep, InstantActionState, InstantOperation, IterateSignal, IterateSignalType, PlayerOperation, PlayerSignal, PracticeState } from "../regulates/interfaces.js";
import { Deck } from "../regulates/types.js";
import { Card } from "./Card.js";
import { Player } from "./Player.js";

const DEAFULT_ERROR: IterateSignal = {type: IterateSignalType.ERROR,state: ErrorSignal.DEAFULT_ERROR};
const ILLEGAL_OPERATION: IterateSignal = {type: IterateSignalType.ERROR,state: ErrorSignal.ILLEGAL_OPERATION};

function requestGenerator(id: number, op: PlayerOperation): IterateSignal{
  return {type: IterateSignalType.REQUEST,state: [id,op]}
}

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

  iterate(signal: PlayerSignal): IterateSignal {
    const automatonState = this.gameState.automatonState;
    const playerState = this.gameState.playerState;
    switch(automatonState.step) {
      case GameStep.GAME_START: {
        automatonState.round = 1;
        automatonState.step = GameStep.UNTAP;
        return requestGenerator(automatonState.priority,PlayerOperation.NONE);
      };
      case GameStep.UNTAP: {
        playerState[automatonState.turn].untapAll();
        return requestGenerator(automatonState.priority,PlayerOperation.INSTANT_ACTION);
      };
      case GameStep.TURN_START: {
        if(signal.type != PlayerOperation.INSTANT_ACTION) {
          return ILLEGAL_OPERATION;
        } else {
          const state = signal.state as InstantActionState;
          switch(state.type) {
            case InstantOperation.PASS: {
              if(automatonState.priority != automatonState.turn) {
                automatonState.priority^=1;
                automatonState.step = GameStep.PRACTICE;
                return requestGenerator(automatonState.priority,PlayerOperation.PRACTICE);
              } else {
                automatonState.priority^=1;
                return requestGenerator(automatonState.priority,PlayerOperation.INSTANT_ACTION);
              }
            };
            default: {
              return DEAFULT_ERROR;
            };
          }
        }
      };
      case GameStep.PRACTICE: {
        if(signal.type != PlayerOperation.PRACTICE) {
          return ILLEGAL_OPERATION;
        } else {
          const state = signal.state as PracticeState;
          playerState[automatonState.turn].practice(state);
          automatonState.step = GameStep.ACTION_START;
          // Todo: Change it into BATTLE
          return requestGenerator(automatonState.priority,PlayerOperation.INSTANT_ACTION);
        }
      }
      default: {
        return DEAFULT_ERROR;
      }
    }
  }

  practice(choice: number) {
    this.gameState.playerState[this.gameState.automatonState.turn].practice(choice);
  }
}