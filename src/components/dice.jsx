import React, { Component } from "react";
import Die from "./die";
import DiceResults from "./dice_results";
import DiceRoller from "./dice_roller";
import Roller from "./roller";

class Dice extends Component {
  state = {
    dice: [
      { id: 2, value: 1 },
      { id: 4, value: 0 },
      { id: 6, value: 1 },
      { id: 8, value: 0 },
      { id: 10, value: 1 },
      { id: 12, value: 0 },
      { id: 20, value: 0 },
      { id: 100, value: 1 },
    ],
    results: [],
  };

  constructor() {
    super();
    this.diceRoller = new DiceRoller();
  }

  handleChange = (event, die) => {
    const dice = [...this.state.dice];
    const index = dice.indexOf(die);
    dice[index] = { ...die };
    dice[index].value = event.target.value;
    this.setState({ dice: dice });
  };

  handleRollClick = () => {
    const dice = this.state.dice.filter((d) => d.value > 0);
    let sides = [];
    for (let i = 0; i < dice.length; i++) {
      const die = dice[i];
      for (let j = 0; j < die.value; j++) {
        sides.push(die.id);
      }
    }
    this.setState({ results: this.diceRoller.roll(sides, true) });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row mb-5">
            <div className="col mb-4">
              <Roller
                light={true}
                selectedPlayer={this.props.selectedPlayer}
                footerDice={this.props.footerDice}
                burnMomentum={this.props.burnMomentum}
              />
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-8 col-sm-12">
              <h6>Multi Dice Roller</h6>
              <div className="row">
                {this.state.dice.map((die) => (
                  <Die key={die.id} die={die} onChange={this.handleChange} />
                ))}
              </div>
            </div>
            <div className="col-lg-4 col-sm-12 pt-4">
              <DiceResults results={this.state.results} onRollClick={this.handleRollClick} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dice;
