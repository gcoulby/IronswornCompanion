import React, { Component } from "react";
import ChallengeDie from "./challengeDie";
import DiceRoller from "./dice_roller";
class D100Roller extends Component {
  state = {
    d100: 0,
  };
  constructor() {
    super();
    this.diceRoller = new DiceRoller();
  }

  getD100DieValue = (percentile) => {
    if (this.state.d100 == 0) return 0;
    return this.state.d100 < 100 ? `${this.state.d100}` : "00";
    // return percentile ? Math.floor(this.state.d100 / 10) * 10 : this.state.d100 % 10;
  };

  handleRollD100 = () => {
    const d100 = this.diceRoller.roll([100], true, false)[0].value;

    this.setState({ d100 });
  };

  render() {
    return (
      <React.Fragment>
        <div className="text-center">
          <button className="btn btn-dark d100-roller" onClick={() => this.handleRollD100()}>
            <ChallengeDie value={this.getD100DieValue(true)} d100={this.state.d100 > 9} />
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default D100Roller;
