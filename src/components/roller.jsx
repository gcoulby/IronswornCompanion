import React, { Component } from "react";
import ChallengeDie from "./challengeDie";
import D100Roller from "./d100Roller";
import DiceRoller from "./dice_roller";
import RollButton from "./rollButton";
class Roller extends Component {
  state = {
    Stat: "",
    AddVal: 0,
    actionRoll: null,
    stats: ["Edge", "Heart", "Iron", "Shadow", "Wits", "Health", "Spirit", "Supply"],
    d100: 75,
  };

  constructor() {
    super();
    this.diceRoller = new DiceRoller();
  }

  handleOnStatChange = (evt) => {
    this.setState({ Stat: evt.target.value });
  };

  handleOnAddValueChange = (evt) => {
    this.setState({ AddVal: evt.target.value });
  };

  handleOnActionRollClicked = () => {
    let stat = this.props.selectedPlayer?.stats.find((s) => s.stat == this.state.Stat);
    let statVal = stat?.value ?? 0;
    const actionRoll = this.diceRoller.actionRoll(statVal, this.state.AddVal);
    actionRoll.StatName = this.state.Stat;
    this.setState({ actionRoll });
  };

  render() {
    return (
      <React.Fragment>
        {/* <div className="col-12">
          <div className="row modesto"> */}
        <div className="col-auto">
          <D100Roller />
          {/* <p> */}
          {/* <i className="mt-5 game-icon game-icon-d10 fa-4x"></i> */}
          {/* </p> */}
        </div>

        <div className="col-auto modesto">
          <label htmlFor="stat-select ">Add Stat</label>
          <select
            id="stat-select"
            className={`form-control ${!this.props.light ? "bg-dark text-light" : ""}`}
            onChange={(e) => this.handleOnStatChange(e)}
            value={this.state.Stat}
          >
            <option></option>
            {this.props.selectedPlayer
              ? this.state.stats.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))
              : React.Fragment}
          </select>
        </div>
        <div className="col-auto modesto">
          <label htmlFor="additional-add">Add</label>
          <input
            type="number"
            value={this.state.AddVal}
            onChange={(e) => this.handleOnAddValueChange(e)}
            className={`form-control ${!this.props.light ? "bg-dark text-light" : ""}`}
          />
        </div>
        <div className="col-auto">
          <label>&nbsp;</label>
          <br />
          <RollButton
            selectedPlayer={this.props.selectedPlayer}
            buttonText="Roll"
            additionalClass={this.props.light ? "btn-dark" : "btn-outline-light"}
            burnMomentum={this.props.burnMomentum}
            postRollAction={() => {}}
            roll={this.state.actionRoll}
            resultColor={this.props.light ? "btn-secondary" : "btn-outline-light"}
            onRoll={() => this.handleOnActionRollClicked()}
          />
        </div>
        {/* </div>
        </div> */}
      </React.Fragment>
    );
  }
}

export default Roller;
