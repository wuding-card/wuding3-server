import { GameStage, GameState } from "../regulates/interfaces";
import { deckLib } from "../regulates/resources";
import { GameAutomaton } from "./GameAutomaton";
import { User } from "./User";

class Room {
  gameAutomaton: GameAutomaton | null;
  user: User[];
  constructor() {
    this.user = [];
    this.gameAutomaton = null;

  }

  startGame() {
    return this.gameAutomaton = new GameAutomaton([deckLib["testDeck1"], deckLib["testDeck1"]])
  }
}

export class RoomManager {
  // Singleton
  private static instance: RoomManager;
  private constructor() {}
  static getInstance() {
    if(!this.instance) {
      this.instance = new RoomManager();
    }
    return this.instance;
  }
  

}