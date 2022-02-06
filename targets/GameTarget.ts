import { Card } from "../engine/Card";

export abstract class GameTarget {
  abstract legal(): boolean;
  abstract extract(): [number[],Card[]];
}

export class PlayerTarget extends GameTarget {
  player: number;
  constructor(player: number) {
    super();
    this.player = player;
  }
  
  extract(): [number[], Card[]] {
    return [[this.player],[]];
  }

  legal(): boolean {
    return true;
  }
}

export class UnionTarget extends GameTarget {
  targets: GameTarget[];
  constructor(...targets: GameTarget[]) {
    super();
    this.targets = targets;
  }

  extract(): [number[], Card[]] {
    const players: number[] = [];
    const cards: Card[] = [];
    for(const i of this.targets) {
      const [nowPlayers,nowCards] = i.extract();
      players.push(...nowPlayers);
      cards.push(...nowCards);
    }
    return [players,cards];
  }

  legal(): boolean {
    let ret = false;
    for(const i of this.targets) {
      ret = ret || i.legal();
    }
    return ret;
  }
}