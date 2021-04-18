import React, { Component } from "react";
import ChallengeDie from "./challengeDie";
class GraphicDice extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="action-score">
          <span>{this.props.ActionScore}</span>
        </div>

        <div className="graphicDicePlus">+</div>
        <ChallengeDie value={this.props.Challenge1Value != 10 ? this.props.Challenge1Value : 0} />
        <ChallengeDie value={this.props.Challenge2Value != 10 ? this.props.Challenge2Value : 0} />
      </React.Fragment>
    );
  }
}

export default GraphicDice;
