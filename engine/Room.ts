import { GameStage, GameState, IterateSignal, IterateSignalType, PlayerOperation, PlayerSignal } from "../regulates/interfaces";
import { deckLib } from "../regulates/resources";
import { Deck } from "../regulates/types";
import { logger } from "../tools/Logger";
import { GameAutomaton } from "./GameAutomaton";
import { User } from "./User";
const defaultDeck1 = "swordAndFist";
const defaultDeck2 = "cardNotEnough";

const PLAYER_NO_ACTION: PlayerSignal = {
  type: PlayerOperation.NONE,
  state: null
};

export class Room {
  
  users: (User | null)[] = [null, null];
  decks: Deck[];
  iterateSignal: IterateSignal | null = null;
  roomName: string;
  gameAutomaton: GameAutomaton | null = null;
  constructor(name: string) {
    this.roomName = name;
    this.decks = [deckLib[defaultDeck1],deckLib[defaultDeck2]];
  }

  startGame() {
    if(this.users.length < 2 || this.users[0] == null || this.users[1] == null) {
      logger.warn("Failed to start game in room %s: PLAYER NOT ENOUGH.", this.roomName);
      return;
    }
    if(this.gameAutomaton != null && this.iterateSignal?.type !== IterateSignalType.GAME_END) {
      logger.warn("Failed to start game in room %s: GAME ALREADY STARTED", this.roomName);
      return;
    }
    logger.info("Start game in room %s successfully with decks: %s.", this.roomName, this.decks);
    this.gameAutomaton = new GameAutomaton([this.decks[0], this.decks[1]]);
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
    let nowState: GameState;
    if(id == 1) {
      nowState = {
        playerState: [this.gameAutomaton.gameState.playerState[1], this.gameAutomaton.gameState.playerState[0]],
        automatonState: this.gameAutomaton.gameState.automatonState,
      }
    }else{
      nowState = {
        playerState: [this.gameAutomaton.gameState.playerState[0], this.gameAutomaton.gameState.playerState[1]],
        automatonState: this.gameAutomaton.gameState.automatonState,
      }
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
    }else if(this.iterateSignal?.type === IterateSignalType.GAME_END){
      for(let i = 0; i < this.users.length; ++i) {
        logger.verbose('Game Result %s renew to user %s with id %s', this.iterateSignal.state, this.users[i]?.userName, i);
        this.users[i]?.emit('room-game-end', {
          gameResult: this.iterateSignal.state,
          roomState: roomState,
        });
      }
    }else{
      for(let i = 0; i < this.users.length; ++i) {
        logger.verbose('Gamestate %s renew to user %s with id %s', this.gameAutomaton, this.users[i]?.userName, i);
        this.users[i]?.emit('renew-game-state', this.gameStateGenerator(i));
      }
    }
  }

  iterate(user: User, signal: PlayerSignal) {
    let userID: number = -1;
    if(user.userName == this.users[0]?.userName) {
      userID = 0;
    }else if(user.userName == this.users[1]?.userName){
      userID = 1;
    }
    if(userID == -1) {
      logger.error("Player %s sent signal %s while not exist in room %s.", user.userName, signal, this.roomName);
      return;
    }else{
      logger.verbose("Player %s with ID %s sent signal %s to room %s.", user.userName, userID, signal, this.roomName);
    }
    if(this.iterateSignal == null || this.iterateSignal.type != IterateSignalType.REQUEST){
      logger.warn("Player %s with ID %s sent signal. But no iterateSignal requesting in room %s", user.userName, userID, this.roomName);
      return;
    }
    if(this.gameAutomaton == null){
      logger.warn("Player %s with ID %s sent signal. But there's no game running in room %s", user.userName, userID, this.roomName);
      return;
    }
    if(userID != this.iterateSignal.state[0] || signal.type != this.iterateSignal.state[1]) {
      logger.verbose("Player %s with ID %s sent signal %s. But not match iterateSignal %s in room %s.", user.userName, userID, signal, this.iterateSignal.state, this.roomName);
      return;
    }
    this.iterateSignal = this.gameAutomaton.iterate(signal);
    logger.silly("Game iterate and got new iterateSignal %s in room %s", this.iterateSignal, this.roomName);
    this.renew();
    return;
  }

}