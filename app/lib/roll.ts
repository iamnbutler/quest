export class Dice {
  sides: number;

  constructor(sides: number) {
    if (sides < 2) throw new Error("Dice must have at least 2 sides.");
    this.sides = sides;
  }

  /**
   * Rolls the dice once.
   *
   * Utilizes the `crypto.getRandomValues` function to generate a
   * cryptographically strong random value that is uniform across
   * the range of the possible values of the dice.
   *
   * @returns The result of the roll and whether it's a critical success or failure.
   */
  roll(): RollResult {
    let array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const result = (array[0] % this.sides) + 1;
    return {
      result: result,
      isCriticalSuccess: result === this.sides,
      isCriticalFailure: result === 1,
    };
  }

  rollMultiple(amountOfRolls: number): RollMultipleResult {
    const rolls: RollResult[] = [];
    for (let i = 0; i < amountOfRolls; i++) {
      rolls.push(this.roll());
    }
    return { rolls, result: rolls[0] };
  }

  static rollNDice(amountOfRolls: number, sides: number): RollMultipleResult {
    let dice = new Dice(sides);
    return dice.rollMultiple(amountOfRolls);
  }

  /**
   * Rolls the dice twice, taking the higher result (advantage).
   */
  rollWithAdvantage(): RollMultipleResult {
    const { rolls } = this.rollMultiple(2);
    const result = [...rolls].sort((a, b) => b.result - a.result)[0];
    return { rolls, result };
  }

  /**
   * Rolls the dice twice, taking the lower result (disadvantage).
   */
  rollWithDisadvantage(): RollMultipleResult {
    const { rolls } = this.rollMultiple(2);
    const result = [...rolls].sort((a, b) => a.result - b.result)[0];
    return { rolls, result };
  }
}

type RollResult = {
  result: number;
  isCriticalSuccess: boolean;
  isCriticalFailure: boolean;
};

type RollMultipleResult = {
  rolls: RollResult[];
  result: RollResult;
};

export const d4 = new Dice(4);
export const d6 = new Dice(6);
export const d8 = new Dice(8);
export const d10 = new Dice(10);
export const d12 = new Dice(12);
export const d20 = new Dice(20);
