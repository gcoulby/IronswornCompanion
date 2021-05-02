import React, { Component } from "react";
import challengeDie from "../img/challenge_die.svg";
class ChallengeDie extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="challenge-dice">
          <span className={`dice-value ${this.props.d100 ? "dice-value-d100" : ""}`}>{this.props.value}</span>
          <img width="60" src={challengeDie} />
        </div>
      </React.Fragment>
    );
  }
}

export default ChallengeDie;
