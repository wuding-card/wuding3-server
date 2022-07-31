import { IterateSignal } from "../regulates/interfaces";
import { deckLib } from "../regulates/resources";
import { Deck } from "../regulates/types";
import { logger } from "../tools/Logger";
import { GameAutomaton } from "./GameAutomaton";
import { User } from "./User";
const defaultDeck1 = "testDeck1";
const defaultDeck2 = "testDeck2";
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
      for(const i of this.users) {
        logger.verbose('Gamestate %s renew to user %s', this.gameAutomaton, i?.userName);
        i?.emit('renew-game-state', {
          state: this.gameAutomaton.gameState
        });
      }
    }
  }

}