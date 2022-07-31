import { IterateSignal } from "../regulates/interfaces";
import { deckLib } from "../regulates/resources";
import { Deck } from "../regulates/types";
import { logger } from "../tools/Logger";
import { GameAutomaton } from "./GameAutomaton";
import { User } from "./User";

export class Room {
  
  users: (User | null)[] = [null, null];
  decks: Deck[] = [deckLib["testDeck1"], deckLib["testDeck1"]];
  iterateSignal: IterateSignal | null = null;
  roomName: string;
  gameAutomaton: GameAutomaton | null = null;
  constructor(name: string) {
    this.roomName = name;
  }

  startGame() {
    return this.gameAutomaton = new GameAutomaton(this.decks);
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
    this.users.filter(i => i?.userName != user.userName);
  }

  renewRoom() {
    const roomState = {
      roomName: this.roomName,
      users: this.users.map(i => i?.userName),
      decks: this.decks,
    };
    for(const i of this.users) {
      logger.verbose('Room %s renew to user %s', this, i?.userName);
      i?.emit('renew-room-state', roomState);
    }
  }

}