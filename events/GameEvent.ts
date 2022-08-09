import { GameState, Target, TargetSets } from "../regulates/interfaces";
import { logger } from "../tools/Logger";

export abstract class GameEvent {
  protected abstract __checkTargets(gameState: GameState, targets: TargetSets): boolean;
  protected abstract __resolve(id: number, gameState: GameState,targets: TargetSets): void;
  resolve(owner: number, gameState: GameState, targets: TargetSets) {
    if(this.__checkTargets(gameState, targets)) {
      this.__resolve(owner, gameState, targets);
    }
  }
}

export class DealAllDamage extends GameEvent {
  amount: number;
  constructor(amount: number) {
    super();
    this.amount = amount;
  }
  protected __checkTargets(gameState: GameState, targets: TargetSets): boolean {
    for(const targetSet of targets) {
      for(const target of targetSet) {
        switch(target.type) {
          case "player": {
            break;
          }
          default: {
            return false;
          }
        }
      }
    }
    return true;
  }
  protected __resolve(owner: number, gameState: GameState,targets: TargetSets): void {
    for(const targetSet of targets) {
      for(const target of targetSet) {
        switch(target.type) {
          case "player": {
            for(const i of target.state.list) {
              gameState.playerState[i].hurt(this.amount);
            }
            break;
          }
          default: {
            // IMPOSSIBLE.
            return;
          }
        }
      }
    }
  }
}

export class AttackOpponent extends GameEvent {
  amount: number;
  constructor(amount: number) {
    super();
    this.amount = amount;
  }
  protected __checkTargets(gameState: GameState, targets: TargetSets): boolean {
    if(targets.length > 0) {
      logger.silly("Attack Opponent Failed: illegal targets.");
      return false;
    }
    return true;
  }
  protected __resolve(owner: number, gameState: GameState, targets: TargetSets): void {
    gameState.playerState[owner ^ 1].hurt(this.amount);
    return;
  }
}

// This event is useless but for copy and create new event.
export class TemplateEvent extends GameEvent {
  attr: any;
  constructor(attr: any) {
    super();
    this.attr = attr;
  }
  protected __checkTargets(gameState: GameState, targets: TargetSets): boolean {
    return true;
  }
  protected __resolve(owner: number, gameState: GameState, targets: TargetSets): void {
    return;
  }
}