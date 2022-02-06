import { GameEvent } from "../events/GameEvent";
import { EventItem, EventItemType, GameState } from "../regulates/interfaces";
import { assert } from "../regulates/utils";

export class EventStack {
  stack: EventItem[] = [];
  gameState: GameState;
  constructor(gameState: GameState) {
    this.gameState = gameState;
  }

  empty() {
    return this.stack.length == 0;
  }

  push(item: EventItem) {
    this.stack.push(item);
  }

  pop(): EventItem {
    assert(!this.empty());
    const item = this.stack.pop() as EventItem;
    return item;
  }

  resolve() {
    assert(!this.empty());
    const item = this.stack.pop() as EventItem;
    switch(item.type) {
      case EventItemType.EVENT: {
        const event = item.container as GameEvent;
        event.resolve(this.gameState);
      }
      case EventItemType.IMMEDIATE: {

      }
      default: {

      }
    }
  }
}