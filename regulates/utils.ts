import { DealDamage, GameEvent, MyErrorEvent } from "../events/GameEvent";
import { CastInfo, CostInfo, EventInfo } from "./interfaces";

export function assert(condition: boolean) {
  if(!condition){
    throw new Error("VITAL_ERROR: Unmatched Assertion");
  }
}

class CardUIDManager {
  count = 0;
  get() {
    return ++this.count;
  }
}

export const CardUID = new CardUIDManager();

export function castAnalyze(castInfo: any): CastInfo {
  const ret: CastInfo = {
    castCost: [],
    resolveEvent: {
      events: [],
    }
  }
  for(const i in castInfo.castCost) {
    const cost = {
      type: i,
      value: castInfo.castCost[i]
    } as CostInfo;
    ret.castCost.push(cost);
  }
  for(const i in castInfo.resolveEvent.events) {

  }
  return ret;
}

export function eventFactory(eventInfo: EventInfo): GameEvent{
  switch(eventInfo.type) {
    case "dealDamage": {
      return new DealDamage(eventInfo.state.amount);
    }
    default: {
      return new MyErrorEvent("Event Factory missed type.");
    }
  }
}