import { GameStage, GameState, IterateSignal } from "../regulates/interfaces";
import { deckLib } from "../regulates/resources";
import { logger } from "../tools/Logger";
import { GameAutomaton } from "./GameAutomaton";
import { Room } from "./Room";
import { User } from "./User";



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