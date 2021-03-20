class DiceRoller {
  /*
    Pass in an array of dice by specifying
    the number of sides in each array position
    e.g. 2 x D4 and 1 x D20 = [4, 4, 20]
    use plusOne = true if you want a die result
    e.g. 1-6, use plusOne = false if you want
    to roll on an array
    */
  roll(dice, plusOne = false) {
    let dice_results = new Array(dice.length);
    for (let i = 0; i < dice.length; i++) {
      const die = dice[i] === 100 ? 10 : dice[i];
      let result = Math.floor(Math.random() * die);
      result += plusOne ? 1 : 0;
      if (dice[i] === 100)
        dice_results[i] = { sides: dice[i], value: result * 10 };
      else dice_results[i] = { sides: dice[i], value: result };
    }
    return dice_results;
  }
}

export default DiceRoller;
