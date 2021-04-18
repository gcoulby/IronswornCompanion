import { result } from "lodash-es";

class DiceRoller {
  /*
  Pass in an array of dice by specifying
  the number of sides in each array position
  e.g. 2 x D4 and 1 x D20 = [4, 4, 20]
  use plusOne = true if you want a die result
  e.g. 1-6, use plusOne = false if you want
  to roll on an array
  */
  roll(dice, plusOne = false, roundD100 = true) {
    let dice_results = new Array(dice.length);
    for (let i = 0; i < dice.length; i++) {
      const die = roundD100 && dice[i] === 100 ? 10 : dice[i];
      let result = Math.floor(Math.random() * die);
      result += plusOne ? 1 : 0;
      if (roundD100 && dice[i] === 100) dice_results[i] = { sides: dice[i], value: result * 10 };
      else dice_results[i] = { sides: dice[i], value: result };
    }
    return dice_results;
  }

  actionRoll(stat = 0, addValue = 0) {
    let actionRoll = 6;
    let dice = this.roll([actionRoll, 10, 10], true);

    let ActionScore = parseInt(dice[0].value) + parseInt(stat) + parseInt(addValue);
    let HitType =
      ActionScore > dice[1].value && ActionScore > dice[2].value
        ? "Strong Hit"
        : ActionScore > dice[1].value || ActionScore > dice[2].value
        ? "Weak Hit"
        : "Miss";
    let d = new Date();
    let result = {
      timestamp: `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`,
      RollType: "Action",
      StatValue: stat,
      AddValue: addValue,
      ActionValue: dice[0].value,
      Challenge1Value: dice[1].value,
      Challenge2Value: dice[2].value,
      ActionScore: ActionScore,
      HitType: HitType,
    };
    return result;
  }

  progressionRoll(progress) {
    let dice = this.roll([10, 10], true);
    let ActionScore = progress;
    let HitType =
      ActionScore > dice[0].value && ActionScore > dice[1].value
        ? "Strong Hit"
        : ActionScore > dice[0].value || ActionScore > dice[1].value
        ? "Weak Hit"
        : "Miss";
    let d = new Date();
    let result = {
      timestamp: `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`,
      RollType: "Progress",
      ActionValue: progress,
      Challenge1Value: dice[0].value,
      Challenge2Value: dice[1].value,
      ActionScore: ActionScore,
      HitType: HitType,
    };
    return result;
  }
}

export default DiceRoller;
