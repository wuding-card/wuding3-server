import { GameStage, GameState, IterateSignal, IterateSignalType, PlayerOperation, PlayerSignal } from "../regulates/interfaces";
import { deckLib } from "../regulates/resources";
import { Deck } from "../regulates/types";
import { logger } from "../tools/Logger";
import { GameAutomaton } from "./GameAutomaton";
import { User } from "./User";
const defaultDeck1 = "testDeck1";
const defaultDeck2 = "testDeck2";

const PLAYER_NO_ACTION: PlayerSignal = {
  type: PlayerOperation.NONE,
  state: null
};

export class Room {
  
  users: (User | null)[] = [null, null];
  decks: ({
    name: string,
    deck: Deck,
  })[];
  iterateSignal: IterateSignal | null = null;
  roomName: string;
  gameAutomaton: GameAutomaton | null = null;
  constructor(name: string) {
    this.roomName = name;
    this.decks = [
      {
        name: defaultDeck1,
        deck: deckLib[defaultDeck1],
      },
      {
        name: defaultDeck2,
        deck: deckLib[defaultDeck2],
      }
    ]
  }

  startGame() {
    if(this.users.length < 2 || this.users[0] == null || this.users[1] == null) {
      logger.warn("Failed to start game in room %s: PLAYER NOT ENOUGH.", this.roomName);
      return;
    }
    if(this.gameAutomaton != null) {
      logger.warn("Failed to start game in room %s: GAME ALREADY STARTED", this.roomName);
      return;
    }
    logger.info("Start game in room %s successfully with decks: %s.", this.roomName, this.decks);
    this.gameAutomaton = new GameAutomaton([this.decks[0].deck, this.decks[1].deck]);
    this.iterateSignal = this.gameAutomaton.iterate(PLAYER_NO_ACTION);
    this.renew();
  }

  addUser(user: User) {
    if(this.users.length < 2){
      this.users.push(user);
      return true;
    }else{
      for(const i in this.users) {
        if(this.users[i] == null) {
          this.users[i] = user;
          return true;
        }
      }
      return false;
    }
  }

  hasUser(user: User) {
    for(const i in this.users) {
      if(this.users[i]?.userName == user.userName) {
        this.users[i] = user;
        return true;
      }
    }
    return false;
  }

  removeUser(user: User) {
    for(const i in this.users) {
      if(this.users[i]?.userName == user.userName) {
        logger.verbose('Remove user %s from room %s successfully.', user.userName, this.roomName);
        this.users[i] = null;
        return;
      }
    }
    logger.warn("Failed to remove user %s from room %s: NO SUCH USER", user.userName, this.roomName);
  }

  swapUser() {
    if(this.users.length < 2){
      logger.error("Failed to swap users in room %s: USERS LESS THEN 2", this.roomName);
      return;
    }
    logger.verbose("User %s and %s swapped successfully.", this.users[0]?.userName, this.users[1]?.userName);
    [this.users[0], this.users[1]] = [this.users[1], this.users[0]];
    this.renew();
  }

  gameStateGenerator(id: number) {
    // Todo: hide those infomations that are invisible for opponent.
    if(this.gameAutomaton == null) {
      logger.error("Failed to get game state in room %s: GAME HASNOT STARTED", this.roomName);
      return null;
    }
    if(this.iterateSignal?.type != IterateSignalType.REQUEST) {
      logger.error("Failed to get iterate signal in room %s: GAME AUTOMATON NOT RUNNING", this.roomName);
      return null;
    }
    const nowState = this.gameAutomaton.gameState;
    if(id == 1) {
      [nowState.playerState[0], nowState.playerState[1]] = [nowState.playerState[1], nowState.playerState[0]];
    }
    const nowSignal = this.iterateSignal.state[0] == id? this.iterateSignal.state[1]: PlayerOperation.NONE;
    return {
      state: nowState,
      signal: nowSignal,
    };
  }

  renew() {
    const roomState = {
      roomName: this.roomName,
      users: this.users.map(i => i?.userName),
      decks: this.decks,
    };
    if(this.gameAutomaton == null) {
      for(const i of this.users) {
        logger.verbose('Room %s renew to user %s', this, i?.userName);
        i?.emit('renew-room-state', roomState);
      }
    }else{
      for(let i = 0; i < this.users.length; ++i) {
        logger.verbose('Gamestate %s renew to user %s', this.gameAutomaton, this.users[i]?.userName);
        this.users[i]?.emit('renew-game-state', this.gameStateGenerator(i));
      }
    }
  }

}