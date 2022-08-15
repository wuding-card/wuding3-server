import { AttackOpponent, ConsultPaper, DealAllDamage, DrawCard, GameEvent, TemplateEvent } from "../events/GameEvent";
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

export function castAnalyze(card: any): CastInfo {
  const castInfo  = card.cast;
  let resolveEndPlaceName = "graveyardState";
  switch(card.type) {
    case "攻击":
    case "防御":
    case "法器": {
      resolveEndPlaceName = "equipmentState";
      break;
    }
    case "法阵": {
      resolveEndPlaceName = "zisurruState";
      break;
    }
    default: {
      resolveEndPlaceName = "graveyardState";
      break;
    }
  }
  const ret: CastInfo = {
    castCost: [],
    resolveEvent: {
      events: [],
    },
    resolveEndPlace: {
      place: resolveEndPlaceName,
      shuffle: false,
    }
  }
  if(castInfo == undefined) {
    return ret;
  }
  if(castInfo.castCost != undefined) {
    for(const i in castInfo.castCost) {
      const cost = {
        type: i,
        value: castInfo.castCost[i]
      } as CostInfo;
      ret.castCost.push(cost);
    }
  }
  if(castInfo.resolveEvent != undefined) {
    for(const i in castInfo.resolveEvent.events) {
      const event = eventFactory(castInfo.resolveEvent.events[i]);
      ret.resolveEvent.events.push(event);
    }
  }
  if(castInfo.resolveEndPlace != null) {
    ret.resolveEndPlace = castInfo.resolveEndPlace;
  }
  return ret;
}

export function eventFactory(eventInfo: EventInfo): GameEvent{
  switch(eventInfo.type) {
    case "dealAllDamage": {
      return new DealAllDamage(eventInfo.state.amount);
    }
    case "attackOpponent": {
      return new AttackOpponent(eventInfo.state.amount);
    }
    case "drawCard": {
      return new DrawCard(eventInfo.state.amount);
    }
    case "consultPaper": {
      return new ConsultPaper(eventFactory(eventInfo.state.tiggerEvent));
    }
    default: {
      // ERROR, NO EVENT MATCHED!!!
      return new TemplateEvent(null);
    }
  }
}