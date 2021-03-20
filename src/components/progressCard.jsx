import React, { Component } from "react";
import IronswornCheck from "./ironswornCheck";
import ProgressTrack from "./progressTrack";
class ProgressCard extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        {/* <div className="row"> */}
        <div className="col-4">
          <div className="card vow-card">
            <div className="card-header bg-dark text-light modesto">
              <div className="row ">
                <div className="col mt-2">
                  {this.props.type} #{this.props.id}
                </div>
                {this.props.showRank ? (
                  <React.Fragment>
                    <div className="col text-right">
                      <select
                        className="form-control modesto bg-dark text-light"
                        value={this.props.rank}
                        onChange={(e) =>
                          this.props.onProgressionRankChange(e, this.props.id)
                        }
                      >
                        {this.props.ranks.map((r) => (
                          <option
                            key={this.props.ranks.indexOf(r)}
                            value={this.props.ranks.indexOf(r)}
                          >
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment></React.Fragment>
                )}
              </div>
            </div>
            <div className="card-body">
              <div className="row mt-3">
                <div className="col">
                  <h5>{this.props.progressText}</h5>
                </div>
              </div>
              <ProgressTrack
                key={this.props.id}
                progress={this.props.progress}
                onProgressionChange={(increment) =>
                  this.props.onProgressionChange(
                    this.props.id,
                    this.props.rank,
                    increment
                  )
                }
                // onProgressionRegress={this.props.onProgressionRegress}
              />
              <div className="text-center pt-3 pb-2">
                <div className="row">
                  <div className="col-8">
                    <button
                      className="btn btn-dark pt-2 pb-2 btn-block"
                      onClick={() =>
                        this.props.onProgressRollClicked(
                          this.props.id,
                          this.props.type,
                          this.props.progress
                        )
                      }
                    >
                      <i className="fas fa-dice-d20"></i>&nbsp;
                      {this.props.rollText}
                    </button>
                  </div>
                  <div className="col-4">
                    <button
                      className="btn btn-danger pt-2 pb-2 btn-block"
                      onClick={() => this.props.onProgressCancel(this.props.id)}
                    >
                      <i className="fas fa-times"></i>&nbsp;Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </React.Fragment>
    );
  }
}

export default ProgressCard;
