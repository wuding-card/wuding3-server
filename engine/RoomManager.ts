import { GameStage, GameState, IterateSignal, RoomState } from "../regulates/interfaces";
import { deckLib } from "../regulates/resources";
import { logger } from "../tools/Logger";
import { GameAutomaton } from "./GameAutomaton";
import { User } from "./User";

export class Room {
  
  users: User[] = [];
  roomState: RoomState;
  
  constructor(name: string) {
    this.roomState = {
      iterateSignal: null,
      gameAutomaton: null,
      roomName: name,
    };
  }

  startGame() {
    return this.roomState.gameAutomaton = new GameAutomaton([deckLib["testDeck1"], deckLib["testDeck1"]])
  }

  addUser(user: User) {
    if(this.users.length >= 2){
      return false;
    }else{
      this.users.push(user);
      return true;
    }
  }

  hasUser(user: User) {
    for(const i in this.users) {
      if(this.users[i].userName == user.userName) {
        this.users[i] = user;
        return true;
      }
    }
    return false;
  }

  removeUser(user: User) {
    this.users.filter(i => i.userName != user.userName);
  }

  renewRoom() {
    for(const i of this.users) {
      logger.verbose('Room %s renew to user %s', this, i.userName);
      i.emit('renew-room-state', this.roomState);
    }
  }

}

export class RoomManager {
  roomMap: Record<string, Room> = {};
  // Singleton
  private static instance: RoomManager;
  private constructor() {}
  static getInstance() {
    if(!this.instance) {
      this.instance = new RoomManager();
    }
    return this.instance;
  }
  

  createRoom(roomName: string) {
    this.roomMap[roomName] = new Room(roomName);
  }

  getRoom(roomName: string) {
    return this.roomMap[roomName];
  }

}