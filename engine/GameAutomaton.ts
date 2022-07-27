import { DiscardState, ErrorSignal, FreeActionState, FreeOperation, GameResult, GameStage, GameState, GameStep, InstantActionState, InstantOperation, IterateSignal, IterateSignalType, PlayerOperation, PlayerSignal, PracticeState } from "../regulates/interfaces.js";
import { Deck } from "../regulates/types.js";
import { assert } from "../regulates/utils.js";
import { Card } from "./Card.js";
import { EventStack } from "./EventStack.js";
import { Player } from "./Player.js";

const DEAFULT_ERROR: IterateSignal = {type: IterateSignalType.ERROR,state: ErrorSignal.DEAFULT_ERROR};
const ILLEGAL_OPERATION: IterateSignal = {type: IterateSignalType.ERROR,state: ErrorSignal.ILLEGAL_OPERATION};
const FUTURE_FEATURE: IterateSignal = {type: IterateSignalType.ERROR,state: ErrorSignal.FUTURE_FEATURE};
const expectedOperation: Record<number,PlayerOperation> = {
  0: PlayerOperation.NONE,
  1: PlayerOperation.NONE,
  2: PlayerOperation.INSTANT_ACTION,
  3: PlayerOperation.PRACTICE,
  4: PlayerOperation.INSTANT_ACTION,
  5: PlayerOperation.ATTACK,
  6: PlayerOperation.INSTANT_ACTION,
  7: PlayerOperation.FREE_ACTION,
  8: PlayerOperation.INSTANT_ACTION,
  9: PlayerOperation.DISCARD,
  10: PlayerOperation.NONE,
}

export class GameAutomaton {
  gameState: GameState;
  stack: EventStack;
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
      },
    }
    this.stack = new EventStack(this.gameState);
  }
  // This function is used to pack the PlayerOperation into IterateSignal.
  requestGenerator(op: PlayerOperation): IterateSignal{
    return {type: IterateSignalType.REQUEST,state: [this.gameState.automatonState.priority,op]}
  }

  // This function is a wrap-up of __iterate().
  // 
  iterate(signal: PlayerSignal): IterateSignal {
    let ret = this.__iterate(signal);
    const playerState = this.gameState.playerState;
    if(!playerState[0].alive() || !playerState[1].alive()) {
      ret = {type: IterateSignalType.GAME_END,state: (playerState[0].alive() != playerState[1].alive()? playerState[0].alive()? GameResult.AWIN: GameResult.BWIN: GameResult.DRAW)};
    }
    return ret;
  }
  // This function means the automaton step forward.
  // This function receives a PlayerSignal, and return an IterateSignal.
  __iterate(signal: PlayerSignal): IterateSignal {
    const automatonState = this.gameState.automatonState;
    const playerState = this.gameState.playerState;
    switch(automatonState.step) {
      case GameStep.GAME_START: {
        automatonState.round = 1;
        automatonState.step = GameStep.UNTAP;
        return this.requestGenerator(PlayerOperation.NONE);
      };
      case GameStep.UNTAP: {
        playerState[automatonState.turn].untapAll();
        return this.requestGenerator(PlayerOperation.INSTANT_ACTION);
      };
      case GameStep.TURN_START:
      case GameStep.BATTLE_START:
      case GameStep.ACTION_START:
      case GameStep.TURN_END: {
        if(signal.type != PlayerOperation.INSTANT_ACTION) {
          return ILLEGAL_OPERATION;
        } else {
          const state = signal.state as InstantActionState;
          switch(state.type) {
            case InstantOperation.PASS: {
              if(automatonState.priority != automatonState.turn) {
                automatonState.priority^=1;
                if(this.stack.empty()) {
                  ++automatonState.step;
                  return this.requestGenerator(expectedOperation[automatonState.step]);
                } else {
                  return FUTURE_FEATURE;
                }
              } else {
                automatonState.priority^=1;
                return this.requestGenerator(PlayerOperation.INSTANT_ACTION);
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
          automatonState.stage = GameStage.BATTLE;
          // Todo: Change it into BATTLE
          return this.requestGenerator(PlayerOperation.INSTANT_ACTION);
        }
      }
      case GameStep.ATTACK: {
        ++automatonState.stage;++automatonState.step;
        return this.requestGenerator(expectedOperation[automatonState.step]);
      }
      case GameStep.FREE_ACTION: {
        assert(automatonState.priority == automatonState.turn);
        if(signal.type == PlayerOperation.FREE_ACTION) {
          const state = signal.state as FreeActionState;
          switch(state.type) {
            case FreeOperation.PASS: {
              automatonState.step = GameStep.TURN_END;
              automatonState.stage = GameStage.END;
              return this.requestGenerator(PlayerOperation.INSTANT_ACTION);
            };
            case FreeOperation.CAST: {
              // Todo: Actions should enter stack.
              // Todo: Refactor this.
              playerState[automatonState.turn].cast(state.state[0],state.state[1],this.gameState);
              return this.requestGenerator(PlayerOperation.FREE_ACTION);
            }
            default: {
              return DEAFULT_ERROR;
            }
          }
        } else if(signal.type == PlayerOperation.INSTANT_ACTION) {
          // Todo: Add support of instantAction
          return FUTURE_FEATURE;
        } else {
          return ILLEGAL_OPERATION;
        }
      }
      case GameStep.DISCARD: {
        if(signal.type == PlayerOperation.DISCARD) {
          const state = signal.state as DiscardState;
          playerState[automatonState.turn].discard(state);
          automatonState.stage = GameStage.PREPARE;
          automatonState.step = GameStep.UNTAP;
          if(automatonState.turn == 1) {
            ++automatonState.round;
          }
          automatonState.turn ^= 1;
          automatonState.priority = automatonState.turn;
          return this.requestGenerator(PlayerOperation.NONE);
        }else {
          return ILLEGAL_OPERATION;
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