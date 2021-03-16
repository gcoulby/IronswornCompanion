import React, { Component } from "react";
import ProgressTrack from "./progressTrack";
import TitleBlock from "./titleBlock";
class EnterTheFray extends Component {
  state = {};

  getCountInArray(arr, name) {
    let c = 0;
    for (let i = 0; i < arr.length; i++) {
      const foe = arr[i];
      c += foe.Name == name ? 1 : 0;
    }
    return c;
  }

  render() {
    console.log(this.props.foes);
    return (
      <React.Fragment>
        <h1>Enter the Fray</h1>
        <div className="row">
          <div className="col">
            <button
              className="btn btn-dark mt-2 mb-4"
              type="button"
              onClick={() => this.props.onRollNewFoe()}
            >
              <i className="fas fa-dice-d20" aria-hidden="true"></i>
              &nbsp;Roll Random Foe
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="btn btn-dark btn-tag">Foe Category</label>
              </div>

              <select
                className="form-control"
                value={this.props.newFoeCategoryId}
                onChange={(e) => this.props.onNewFoeCategoryChanged(e)}
              >
                <option>Select Foe Category</option>
                {this.props.foes.map((f) => (
                  <option key={f.Name} value={this.props.foes.indexOf(f)}>
                    {f.Name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-6">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <button
                  className="btn btn-dark"
                  type="button"
                  onClick={() => this.props.onRollNewFoeType()}
                >
                  <i className="fas fa-dice-d20"></i> Roll Foe Type
                </button>
              </div>

              <select
                className="form-control"
                value={this.props.newFoeTypeId}
                onChange={(e) => this.props.onNewFoeTypeChanged(e)}
              >
                <option>Select Foe Type</option>

                {this.props.newFoeCategoryId != -1 &&
                this.props.newFoeCategoryId != "Select Foe Category" ? (
                  <React.Fragment>
                    {this.props.foes
                      .find(
                        (f) =>
                          this.props.foes.indexOf(f) ==
                          this.props.newFoeCategoryId
                      )
                      .Foes.map((f) => (
                        <option
                          key={f.Name}
                          value={this.props.foes[
                            this.props.newFoeCategoryId
                          ].Foes.indexOf(f)}
                        >
                          {f.Name}
                        </option>
                      ))}
                  </React.Fragment>
                ) : (
                  React.Fragment
                )}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {this.props.newFoeTypeId != -1 &&
            this.props.newFoeTypeId != "Select Foe Type" ? (
              <React.Fragment>
                {/* <p>
                  <span className="modesto">Description</span>&nbsp;
                  {
                    this.props.foes[this.props.newFoeCategoryId].Foes[
                      this.props.newFoeTypeId
                    ].Description
                  }
                </p> */}
                <table className="table">
                  <thead className="modesto">
                    <th>Rank</th>
                    <th>Source</th>
                    <th>Page</th>
                  </thead>
                  <tbody>
                    <td>
                      {
                        this.props.foes[this.props.newFoeCategoryId].Foes[
                          this.props.newFoeTypeId
                        ].Rank
                      }
                    </td>
                    <td>
                      {
                        this.props.foes[this.props.newFoeCategoryId].Foes[
                          this.props.newFoeTypeId
                        ].Source
                      }
                    </td>
                    <td>
                      {
                        this.props.foes[this.props.newFoeCategoryId].Foes[
                          this.props.newFoeTypeId
                        ].Page
                      }
                    </td>
                  </tbody>
                </table>
                <div className="row mt-3">
                  <div className="col">
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={() => this.props.onAddFoe()}
                    >
                      <i className="fas fa-plus" aria-hidden="true"></i>
                      &nbsp;Add Foe
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              React.Fragment
            )}
          </div>
        </div>

        {/* <div className="row">
          <div className="col">
            <button
              className="btn btn-dark mt-2 mb-4"
              type="button"
              onClick={() => this.props.onAddRandomPack()}
            >
              <i className="fas fa-dice-d20" aria-hidden="true"></i>
              &nbsp;Add Random Pack
            </button>
          </div>
        </div> */}
        <TitleBlock title="Active Foes" />
        <div className="row">
          {this.props.activeFoes.loneFoes.length > 0 ? (
            <React.Fragment>
              {this.props.activeFoes.loneFoes.map((lf) => (
                <React.Fragment>
                  <div className="col-6">
                    <div className="card foe-card">
                      <div className="card-header bg-dark text-light modesto">
                        <div className="row">
                          <div className="col-6">{lf.Name}</div>
                          <div className="col-6 text-right">
                            <div className="btn btn-tag btn-outline-light">
                              {lf.Rank}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <table className="table">
                          <thead className="modesto">
                            <th>Source</th>
                            <th>Page</th>
                            <th>Drives</th>
                            <th>Features</th>
                            <th>Tactics</th>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{lf.Source}</td>
                              <td>{lf.Page}</td>
                              <td>
                                {lf.Drives.map((d) => (
                                  <p>{d}</p>
                                ))}
                              </td>
                              <td>
                                {lf.Features.map((f) => (
                                  <p>{f}</p>
                                ))}
                              </td>
                              <td>
                                {lf.Tactics.map((t) => (
                                  <p>{t}</p>
                                ))}
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <h6 className="text-center">COMBAT PROGRESS</h6>
                        <ProgressTrack
                          key={lf.id}
                          progress={lf.progress}
                          onProgressionChange={(increment) =>
                            this.props.onProgressionChanged(
                              lf.id,
                              lf.Rank,
                              increment
                            )
                          }
                        />

                        <div className="text-center pt-3 pb-2">
                          <div className="row">
                            <div className="col-8">
                              <button
                                className="btn btn-dark pt-2 pb-2 btn-block"
                                onClick={() =>
                                  this.props.onProgressRollClicked(
                                    lf.id,
                                    "foe",
                                    lf.progress
                                  )
                                }
                              >
                                <i className="fas fa-dice-d20"></i>&nbsp; Roll
                                Progress
                              </button>
                            </div>
                            <div className="col-4">
                              <button className="btn btn-danger pt-2 pb-2 btn-block">
                                <i className="fas fa-times"></i>&nbsp;Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </React.Fragment>
          ) : (
            React.Fragment
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default EnterTheFray;
