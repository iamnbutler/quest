class Dice {
  sides: number;

  constructor(sides: number) {
    this.sides = sides;
  }

  roll(): number {
    let array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return (array[0] % this.sides) + 1;
  }

  rollMultiple(times: number): number[] {
    let results: number[] = [];
    for (let i = 0; i < times; i++) {
      results.push(this.roll());
    }
    return results;
  }

  static rollNDice(n: number, sides: number): number[] {
    let dice = new Dice(sides);
    return dice.rollMultiple(n);
  }

  static rollMultipleNDice(n: number, diceArray: Dice[]): number[] {
    let results: number[] = [];
    diceArray.forEach((dice) => {
      for (let i = 0; i < n; i++) {
        results.push(dice.roll());
      }
    });
    return results;
  }
}
