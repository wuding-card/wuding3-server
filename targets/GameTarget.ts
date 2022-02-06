export abstract class GameTarget {
  abstract legal(): boolean;
}

export class PlayerTarget extends GameTarget {
  player: number;
  constructor(player: number) {
    super();
    this.player = player;
  }
  
  legal() {
    return true;
  }
}

export class UnionTarget extends GameTarget {
  targets: GameTarget[];
  constructor(...targets: GameTarget[]) {
    super();
    this.targets = targets;
  }
  legal() {
    let ret = false;
    for(const i of this.targets) {
      ret = ret || i.legal();
    }
    return ret;
  }
}