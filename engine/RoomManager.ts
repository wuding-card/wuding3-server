import { GameStage, GameState, IterateSignal } from "../regulates/interfaces";
import { deckLib } from "../regulates/resources";
import { GameAutomaton } from "./GameAutomaton";
import { User } from "./User";

class Room {
  gameAutomaton: GameAutomaton | null;
  user: string[];
  iterateSignal: IterateSignal | null = null;
  constructor() {
    this.user = ["AnonymousID1", "AnonymousID2"];
    this.gameAutomaton = null;
  }

  startGame() {
    return this.gameAutomaton = new GameAutomaton([deckLib["testDeck1"], deckLib["testDeck1"]])
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
    this.roomMap[roomName] = new Room();
  }

  getRoom(roomName: string) {
    return this.roomMap[roomName];
  }

}