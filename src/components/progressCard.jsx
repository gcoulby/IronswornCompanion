import React, { Component } from "react";
import DangerButton from "./dangerButton";
import IronswornCheck from "./ironswornCheck";
import ProgressTrack from "./progressTrack";
import RollButton from "./rollButton";
import RollIcon from "./rollIcon";
class ProgressCard extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        {/* <div className="row"> */}
        <div className="col-12 col-lg-6">
          <div className="card vow-card mb-4">
            <div className="card-header bg-dark text-light modesto">
              <div className="row ">
                <div className="col mt-2">
                  {this.props.type} #{this.props.id} {this.props.progression.complete ? "(Complete)" : ""}
                </div>
                {this.props.showRank ? (
                  <React.Fragment>
                    <div className="col text-right">
                      <select
                        disabled={this.props.progression.complete}
                        className="form-control modesto bg-dark text-light"
                        value={this.props.rank}
                        onChange={(e) => this.props.onProgressionPropertyChange(e, this.props.id, "rank")}
                      >
                        {this.props.ranks.map((r) => (
                          <option key={this.props.ranks.indexOf(r)} value={this.props.ranks.indexOf(r)}>
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
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <label className="btn btn-dark btn-tag">Name</label>
                    </div>
                    <input
                      disabled={this.props.progression.complete}
                      type="text"
                      className="form-control"
                      placeholder="Title"
                      aria-label="Name"
                      aria-describedby="basic-addon2"
                      value={this.props.progression.title}
                      onChange={(e) => this.props.onProgressionPropertyChange(e, this.props.id, "title")}
                    />
                  </div>

                  <span className="modesto mt-2">Additional Details:</span>
                  <textarea
                    disabled={this.props.progression.complete}
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    aria-label="Name"
                    aria-describedby="basic-addon2"
                    rows="4"
                    value={this.props.progression.details}
                    onChange={(e) => this.props.onProgressionPropertyChange(e, this.props.id, "details")}
                  ></textarea>
                </div>
              </div>
              <ProgressTrack
                key={this.props.id}
                complete={this.props.progression.complete}
                progress={this.props.progress}
                onProgressionChange={(increment) =>
                  this.props.onProgressionChange(this.props.id, this.props.rank, increment)
                }
                // onProgressionRegress={this.props.onProgressionRegress}
              />
              <div className="text-center pt-3 pb-2">
                <div className="row">
                  <div className="col-9">
                    <RollButton
                      buttonText={this.props.rollText}
                      disabled={this.props.progression.complete}
                      roll={this.props.progression.progressRoll}
                      onRoll={() =>
                        this.props.onProgressRollClicked(this.props.id, this.props.type, this.props.progress)
                      }
                    />
                    {/* 
                    <button
                      className="btn btn-dark pt-2 pb-2 btn-block"
                      onClick={() =>
                        this.props.onProgressRollClicked(this.props.id, this.props.type, this.props.progress)
                      }
                    >
                      <RollIcon /> {this.props.rollText}
                    </button> */}
                  </div>
                  <div className="col-3">
                    <DangerButton
                      buttonText="Cancel"
                      additionalButtonClasses="pt-2 pb-2 btn-block"
                      iconClass="fas fa-times"
                      onDangerClick={this.props.onProgressCancel}
                      deleteId={this.props.id}
                      deleteMessage="Are you sure you want to delete this progress tracker?"
                    />
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
