import cardJSON from '../assets/lib/cards.json';
import deckJSON from '../assets/lib/decks.json';
import { Deck } from './types';

export const cardLib: Record<string,any> = cardJSON;

export const deckLib: Record<string,Deck> = deckJSON;

export const SectID: Record<string,number> = {
  "通用": 0,
  "奔雷": 1,
  "焚金": 2,
  "焚天": 3,
  "光华": 4,
  "飘渺": 5,
  "天灵": 6,
  "万法": 7,
  "元力": 8,
}

export const TypeID: Record<string,number> = {
  "万物": 0,
  "即时": 1,
  "触发": 2,
  "持续": 3,
  "法阵": 4,
  "攻击": 5,
  "防御": 6,
  "法器": 7,
}

export const LevelID: Record<string,number> = {
  "凡人": 0,
  "炼气": 1,
  "筑基": 2,
  "金丹": 3,
  "元神": 4,
  "炼虚": 5,
  "涅槃": 6,
  "逍遥": 7,
}