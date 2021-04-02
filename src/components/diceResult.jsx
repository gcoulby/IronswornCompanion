import React, { Component } from "react";
import RollIcon from "./rollIcon";
class DiceResult extends Component {
  state = {
    resultText: this.props.diceResult.HitType,
  };

  canBurn = () => {
    if (
      (this.props.diceResult.HitType == "Miss" || this.props.diceResult.HitType == "Weak Hit") &&
      this.props.diceResult.RollType == "Action"
    ) {
      if (this.props.selectedPlayer) {
        let momentum = this.props.selectedPlayer.stats.find((p) => p.stat == "Momentum").value;
        if (momentum > this.props.diceResult.Challenge1Value || momentum > this.props.diceResult.Challenge2Value)
          return true;
      }
    }
  };

  missedHitBurn = (mouseOver) => {
    this.setState({ resultText: mouseOver && this.canBurn() ? "Burn?" : this.props.diceResult.HitType });
  };

  burnClick = () => {
    if (!this.canBurn()) return;
    let momentum = this.props.selectedPlayer.stats.find((p) => p.stat == "Momentum").value;
    const diceResult = this.props.diceResult;
    diceResult.Challenge1Value = momentum > diceResult.Challenge1Value ? 0 : diceResult.Challenge1Value;
    diceResult.Challenge2Value = momentum > diceResult.Challenge2Value ? 0 : diceResult.Challenge2Value;

    diceResult.HitType =
      diceResult.ActionScore > diceResult.Challenge1Value && diceResult.ActionScore > diceResult.Challenge2Value
        ? "Strong Hit"
        : diceResult.ActionScore > diceResult.Challenge1Value || diceResult.ActionScore > diceResult.Challenge2Value
        ? "Weak Hit"
        : "Miss";
    this.setState({ diceResult });
    this.props.postRollAction();
    this.props.burnMomentum();
  };

  render() {
    return (
      <React.Fragment>
        <div
          className={`btn ${!this.canBurn() ? "btn-tag" : ""} ${this.props.color} tip`}
          onMouseOver={() => this.missedHitBurn(true)}
          onMouseLeave={() => this.missedHitBurn(false)}
          onClick={() => this.burnClick()}
        >
          {/* {this.props.diceResult.HitType == "Miss" ? (
            <React.Fragment></React.Fragment>
          ) : (
            <React.Fragment>{this.props.diceResult.ResultText}</React.Fragment>
          )} */}

          {this.state.resultText}
          <div className="top">
            <h3>{this.props.diceResult.HitType}</h3>
            <React.Fragment>
              <span>{this.props.diceResult.RollType} Score:</span>
              {this.props.diceResult.RollType === "Action" ? (
                <React.Fragment>
                  <p>
                    Dice ({this.props.diceResult.ActionValue})
                    {this.props.diceResult.StatName != "" ? (
                      <React.Fragment>
                        &nbsp;+&nbsp;
                        {this.props.diceResult.StatName}
                        &nbsp; ({this.props.diceResult.StatValue})
                      </React.Fragment>
                    ) : (
                      React.Fragment
                    )}
                    &nbsp;+&nbsp;
                    {this.props.diceResult.AddValue} = &nbsp;
                    {this.props.diceResult.ActionScore}
                  </p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p>Progress: {this.props.diceResult.ActionScore}</p>
                </React.Fragment>
              )}

              <p>Challenge Dice 1: {this.props.diceResult.Challenge1Value}</p>
              <p>Challenge Dice 2: {this.props.diceResult.Challenge2Value}</p>
            </React.Fragment>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DiceResult;
