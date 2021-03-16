import React, { Component } from "react";
import ExperienceCheck from "./experienceCheck";
import UniqueKeyGenerator from "./uniqueKeyGenerator";
class ExperienceTrack extends Component {
  state = {};
  getChecks() {
    let checks = [];
    let spentXp = this.props.selectedPlayer.spentExperience;
    let totalXp = this.props.selectedPlayer.totalExperience;

    for (let i = 1; i < 31; i++) {
      if (i <= spentXp) checks.push(10);
      else if (i <= totalXp) checks.push(2);
      else {
        checks.push(0);
      }
    }
    return checks;
  }
  render() {
    return (
      <React.Fragment>
        <ul className="progressTrack mt-3 text-center">
          {this.getChecks().map((c) => (
            <li key={UniqueKeyGenerator.generate()}>
              <ExperienceCheck count={c} />
            </li>
          ))}
          {this.props.hideButtons ? (
            <React.Fragment></React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <button
                  className="btn btn-outline-secondary progressTrackBtn"
                  onClick={() => this.props.onExperienceChange("DEC")}
                >
                  <i className="fa fa-minus" aria-hidden="true"></i>
                </button>
              </li>
              <li>
                <button
                  className="btn btn-secondary progressTrackBtn"
                  onClick={() => this.props.onExperienceChange("REG")}
                >
                  <i className="fa fa-backward" aria-hidden="true"></i>
                </button>
              </li>
              <li>
                <button
                  className="btn btn-dark progressTrackBtn"
                  onClick={() => this.props.onExperienceChange("ADV")}
                >
                  <i className="fa fa-forward" aria-hidden="true"></i>
                </button>
              </li>
              <li>
                <button
                  className="btn btn-outline-dark progressTrackBtn"
                  onClick={() => this.props.onExperienceChange("INC")}
                >
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
              </li>
            </React.Fragment>
          )}
        </ul>
      </React.Fragment>
    );
  }
}

export default ExperienceTrack;
