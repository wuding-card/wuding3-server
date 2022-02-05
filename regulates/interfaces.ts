export interface CardState {
  name: string,
  counter: Record<string,number>,
  tapped: boolean,
  faceup: boolean,
  attribute: Record<string, number>,
  sectID: number,
  level: number,
  typeID: number,
  rarity: number,
}

export interface PlayerState {
  basicState: {
    health: number,
    mana: number,
    level: number,
  },
  groundState: {
    sorceryState: CardState[],
    equipmentState: CardState[],
    zisurruState: CardState[],
    libraryState: CardState[],
    graveyardState: CardState[],
    blackholeState: CardState[],
  },
  handState: CardState[],
  actionState: {
    drawPerPractice: number,
  }
}

export enum PlayerOperation {
  PRACTICE,
  ACTION,
}

export enum GameStage {
  INIT,
  ALICE_PREPARE,
  ALICE_ACTION,
  ALICE_END,
  BOB_PREPARE,
  BOB_ACTION,
  BOB_END,
  ALICE_WIN,
  BOB_WIN,
  DRAW,
}

export interface GameState {
  playerState: PlayerState[],
  automatonState: {
    stage: GameStage,
    /* 0: Alice, 1: Bob */
    priority: number,
    operation: PlayerOperation,
  }
}