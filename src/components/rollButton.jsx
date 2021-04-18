import React, { Component } from "react";
import DiceResult from "./diceResult";
import RollIcon from "./rollIcon";
class RollButton extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="btn-group d-flex" data-toggle="buttons">
          <button
            className={`btn btn-${this.props.disabled ? "outline-" : ""}dark ${
              this.props.additionalClass ? this.props.additionalClass : ""
            }`}
            type="button"
            disabled={this.props.disabled}
            title="Delve deeper into the depths"
            onClick={() => this.props.onRoll()}
          >
            <RollIcon /> {this.props.buttonText}
          </button>
          {this.props.roll ? (
            <DiceResult
              diceResult={this.props.roll}
              burnMomentum={this.props.burnMomentum}
              postRollAction={this.props.postRollAction}
              selectedPlayer={this.props.selectedPlayer}
              color={this.props.resultColor ? this.props.resultColor : "btn-outline-dark"}
              hidePreview={this.props.hidePreview}
            />
          ) : (
            <div className={`btn ${this.props.resultColor ? this.props.resultColor : "btn-outline-dark"}`}>Result</div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default RollButton;
