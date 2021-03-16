import React, { Component } from "react";
import IronswornCheck from "./ironswornCheck";
import UniqueKeyGenerator from "./uniqueKeyGenerator";
class ProgressTrack extends Component {
  state = {};
  getChecks() {
    let checks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < this.props.progress; i++) {
      let idx = i == 0 ? 0 : Math.floor(i / 4);
      checks[idx] = (i % 4) + 1;
    }
    return checks;
  }
  render() {
    return (
      <React.Fragment>
        <ul className="progressTrack mt-3 text-center">
          {this.getChecks().map((c) => (
            <li key={UniqueKeyGenerator.generate()}>
              <IronswornCheck count={c} />
            </li>
          ))}
          {this.props.hideButtons ? (
            <React.Fragment></React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <button
                  className="btn btn-secondary progressTrackBtn"
                  onClick={() => this.props.onProgressionChange(false)}
                >
                  <i className="fa fa-minus" aria-hidden="true"></i>
                </button>
              </li>
              <li>
                <button
                  className="btn btn-dark progressTrackBtn"
                  onClick={() => this.props.onProgressionChange(true)}
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

export default ProgressTrack;
