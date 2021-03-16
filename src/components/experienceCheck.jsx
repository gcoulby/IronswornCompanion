import React, { Component } from "react";
import UniqueKeyGenerator from "./uniqueKeyGenerator";
class ExperienceCheck extends Component {
  state = {};

  get Ticks() {
    let ticks = [];
    for (let i = 1; i <= this.props.count; i++) {
      ticks.push(
        <span
          key={UniqueKeyGenerator.generate()}
          className={`progressTick progressTick-${i}`}
        ></span>
      );
    }
    return ticks;
  }
  render() {
    return (
      <React.Fragment>
        <div className="progressTrackBox progressTrackBoxRound">
          {this.Ticks.map((t) => t)}
        </div>
      </React.Fragment>
    );
  }
}

export default ExperienceCheck;
