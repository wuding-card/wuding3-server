import { GameEvent } from "../events/GameEvent";
import { CastInfo, CostInfo } from "./interfaces";

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
  return ret;
}
