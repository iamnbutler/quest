import { Dice } from "./roll";

export const skillCheck = (need: number, modifier: number, dice: Dice) => {
  const roll = dice.roll();
  const { result, isCriticalFailure, isCriticalSuccess } = roll;
  const isSuccess = result + modifier >= need;
  return {
    roll: roll.result,
    need,
    isSuccess,
    isCriticalSuccess,
    isCriticalFailure,
  };
};

export type SkillCheck = {
  need: number;
  modifier: number;
  dice: Dice;
};

export type SkillCheckResult = ReturnType<typeof skillCheck>;
