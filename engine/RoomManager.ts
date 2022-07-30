import { GameStage, GameState, IterateSignal } from "../regulates/interfaces";
import { deckLib } from "../regulates/resources";
import { GameAutomaton } from "./GameAutomaton";
import { User } from "./User";

export class Room {
  roomName: string;
  gameAutomaton: GameAutomaton | null = null;
  users: string[] = [];
  iterateSignal: IterateSignal | null = null;
  constructor(name: string) {
    this.roomName = name;
  }

  startGame() {
    return this.gameAutomaton = new GameAutomaton([deckLib["testDeck1"], deckLib["testDeck1"]])
  }

  addUser(userName: string) {
    if(this.users.length >= 2){
      return false;
    }else{
      this.users.push(userName);
      return true;
    }
  }

  hasUser(userName: string) {
    for(const i of this.users) {
      if(i == userName) {
        return true;
      }
    }
    return false;
  }

  removeUser(userName: string) {
    this.users.filter(i => i != userName);
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