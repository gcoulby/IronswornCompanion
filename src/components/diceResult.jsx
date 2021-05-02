import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import ChallengeDie from "./challengeDie";
import GraphicDice from "./graphicDice";
import RollIcon from "./rollIcon";
class DiceResult extends Component {
  state = {
    hoverText: null,
  };

  canBurn = () => {
    if (
      (this.props.diceResult.HitType == "Miss" || this.props.diceResult.HitType == "Weak Hit") &&
      this.props.diceResult.RollType == "Action"
    ) {
      if (this.props.selectedPlayer) {
        let momentum = this.props.selectedPlayer.stats.find((p) => p.stat == "Momentum").value;
        if (
          momentum >= this.props.selectedPlayer.resetMomentum &&
          (momentum > this.props.diceResult.Challenge1Value || momentum > this.props.diceResult.Challenge2Value)
        )
          return true;
      }
    }
  };

  missedHitBurn = (mouseOver) => {
    // let buttonText = mouseOver ? this.props.diceResult.HitType; //} (${this.props.diceResult.ActionScore} vs ${this.props.diceResult.Challenge1Value} & ${this.props.diceResult.Challenge2Value})`;
    this.setState({ hoverText: mouseOver && this.canBurn() ? "Burn?" : null });
  };

  getHitType = () => {
    let suffix = this.props.diceResult.Challenge1Value === this.props.diceResult.Challenge2Value ? "!" : "";
    return this.props.diceResult.HitType + suffix;
  };

  burnClick = (touch = false) => {
    if (!this.canBurn() || touch) return;
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

  getResultText = () => {
    let hitType = this.getHitType();
    let ch1 = this.props.diceResult.Challenge1Value;
    let ch2 = this.props.diceResult.Challenge2Value;
    if (this.canBurn()) {
      let momentum = this.props.selectedPlayer.stats.find((p) => p.stat == "Momentum").value;
      ch1 =
        momentum > this.props.diceResult.Challenge1Value ? (
          <u>{this.props.diceResult.Challenge1Value}</u>
        ) : (
          this.props.diceResult.Challenge1Value
        );
      ch2 =
        momentum > this.props.diceResult.Challenge2Value ? (
          <u>{this.props.diceResult.Challenge2Value}</u>
        ) : (
          this.props.diceResult.Challenge2Value
        );
    }

    let out = (
      <React.Fragment>
        {hitType}{" "}
        {this.props.hidePreview ? (
          React.Fragment
        ) : (
          <React.Fragment>
            ({this.props.diceResult.ActionScore} vs {ch1} &amp; {ch2} )
          </React.Fragment>
        )}
      </React.Fragment>
    );
    return out;
  };

  render() {
    return (
      <React.Fragment>
        <div
          className={`btn ${!this.canBurn() ? "btn-tag" : ""} ${this.props.color} tip text-center`}
          onMouseOver={() => this.missedHitBurn(true)}
          onMouseLeave={() => this.missedHitBurn(false)}
          onTouchStart={() => this.burnClick(true)}
          onMouseDown={() => this.burnClick()}
        >
          {this.canBurn() ? (
            <React.Fragment>
              {this.state.hoverText ? this.state.hoverText : <React.Fragment>{this.getResultText()}</React.Fragment>}
            </React.Fragment>
          ) : (
            <React.Fragment>{this.getResultText()}</React.Fragment>
          )}
          <div className="top">
            <h3>{this.getHitType()}</h3>
            <React.Fragment>
              {this.props.diceResult.RollType === "Action" ? (
                <React.Fragment>
                  <span>Action Score:</span>
                  <p>
                    Die ({this.props.diceResult.ActionValue})
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
                  {/* <span>{this.props.diceResult.RollType} Score:</span> */}
                  {/* <p>Progress: {this.props.diceResult.ActionScore}</p> */}
                </React.Fragment>
              )}

              <div className="graphic-dice">
                <GraphicDice
                  ActionScore={this.props.diceResult.ActionScore}
                  Challenge1Value={this.props.diceResult.Challenge1Value}
                  Challenge2Value={this.props.diceResult.Challenge2Value}
                />
                {/* <ChallengeDie value={this.props.diceResult.Challenge2Value} />
                <ChallengeDie value={this.props.diceResult.Challenge1Value} /> */}
              </div>
              <button className="btn btn-outline-light d-xs-block d-lg-none" onClick={() => this.burnClick()}>
                Burn?
              </button>
            </React.Fragment>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DiceResult;
