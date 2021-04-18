import React, { Component } from "react";
import DiceRoller from "./dice_roller";
import FoeCard from "./foeCard";
import FoeOverviewTable from "./foeOverviewTable";
import ProgressTrack from "./progressTrack";
import RollIcon from "./rollIcon";
import TitleBlock from "./titleBlock";
import UnselectedPlayer from "./unselected_player";
class EnterTheFray extends Component {
  state = {};

  constructor(props) {
    super();
    if (props.newFoe.nextFoeId === undefined) this.resetNewFoe(props);
    this.diceRoller = new DiceRoller();
    this.state.showGenerator = props.showGenerator;
  }

  resetNewFoe(props) {
    const newFoe = props !== null ? props.newFoe : this.props.newFoe;
    newFoe.nextFoeId = 0;
    newFoe.newFoeCategoryId = -1;
    newFoe.newFoeTypeId = -1;
    this.setState({ newFoe });
  }

  getCountInArray(arr, name) {
    let c = 0;
    for (let i = 0; i < arr.length; i++) {
      const foe = arr[i];
      c += foe.Name == name ? 1 : 0;
    }
    return c;
  }

  getRandomFoeCategory() {
    let rn = this.diceRoller.roll([this.props.foes.length], false)[0].value;
    let cat = this.props.foes[rn].Type;
    return cat;
  }

  getRandomFoeType(newFoeCategoryId) {
    let foes = this.props.foes.filter((f) => f.Type === newFoeCategoryId);
    let rn = this.diceRoller.roll([foes.length], false)[0].value;
    let type = foes[rn].Name;
    return type;
  }

  getRandomPackFoe(newFoeCategoryId, rank = null) {
    let foes = this.props.foes[newFoeCategoryId].Foes.filter((f) => f.Rank === "Dangerous");
    let rn = this.diceRoller.roll([foes.length], false)[0].value;
    let foe = foes[rn];
    return foe;
  }

  /*=================================*/
  /*    Events
  /*=================================*/

  handleOnRollNewFoe = () => {
    const newFoe = this.props.newFoe;
    newFoe.newFoeCategoryId = this.getRandomFoeCategory();
    newFoe.newFoeTypeId = this.getRandomFoeType(newFoe.newFoeCategoryId);
    this.setState({ newFoe });
  };

  handleOnRollNewFoeType = () => {
    const newFoe = this.props.newFoe;
    if (this.props.newFoe.newFoeCategoryId === -1 || this.props.newFoe.newFoeCategoryId === "Select Foe Category") {
      newFoe.newFoeCategoryId = this.getRandomFoeCategory();
    }
    newFoe.newFoeTypeId = this.getRandomFoeType(newFoe.newFoeCategoryId);
    this.setState({ newFoe });
  };

  handleOnNewFoeCategoryChanged = (evt) => {
    const newFoe = this.props.newFoe;
    newFoe.newFoeCategoryId = evt.target.value;
    newFoe.newFoeTypeId = -1;
    this.setState({ newFoe });
  };

  handleOnNewFoeTypeChanged = (evt) => {
    const newFoe = this.props.newFoe;
    newFoe.newFoeTypeId = evt.target.value;
    this.setState({ newFoe });
  };

  handleOnAddFoe = () => {
    if (
      this.props.newFoe.newFoeCategoryId == -1 ||
      this.props.newFoe.newFoeCategoryId == "Select Foe Category" ||
      this.props.newFoe.newFoeTypeId == -1 ||
      this.props.newFoe.newFoeTypeId == "Select Foe Type"
    )
      return;
    const activeFoes = this.props.activeFoes;

    const foe = { ...this.getSelectedFoe() }; // this.props.foes[this.props.newFoe.newFoeCategoryId].Foes[this.props.newFoe.newFoeTypeId];
    foe.progress = 0;
    foe.id = this.props.newFoe.nextFoeId;
    activeFoes.push(foe);
    const newFoe = this.props.newFoe;
    newFoe.nextFoeId = this.props.newFoe.nextFoeId + 1;
    newFoe.newFoeCategoryId = -1;
    newFoe.newFoeTypeId = -1;
    this.setState({ activeFoes });
    this.setState({ newFoe });
  };

  handleActiveFoeDelete = (id) => {
    const activeFoes = this.props.activeFoes;
    let pos = -1;
    for (let i = 0; i < activeFoes.length; i++) {
      let af = activeFoes[i];
      if (af.id === id) {
        pos = i;
      }
    }

    if (pos != -1) activeFoes.splice(pos, 1);
    this.props.onProgressRollClicked(-1, "foe", 0);
    this.setState({ activeFoes: activeFoes });
  };

  // handleOnAddRandomPack = () => {
  //   let ranks = ["Troublesome", "Dangerous"];
  //   let rank = ranks[this.diceRoller.roll([2], false)[0].value];
  //   let rn = this.diceRoller.roll([10], false)[0].value;
  //   const activeFoes = this.props.activeFoes;
  //   const newFoeCategoryId = this.getRandomFoeCategory();
  //   activeFoes.packs.push([]);
  //   for (let i = 0; i < rn; i++) {
  //     // const newFoeTypeId = this.getRandomFoeType(newFoeCategoryId, true);
  //     // const foe = this.props.foes[newFoeCategoryId].Foes[newFoeTypeId];
  //     const foe = this.getRandomPackFoe(newFoeCategoryId, rank);

  //     activeFoes.packs[activeFoes.packs.length - 1].push(foe);
  //   }

  //   this.setState({ activeFoes });
  //   this.setState({ newFoeCategoryId: -1 });
  //   this.setState({ newFoeTypeId: -1 });
  // };

  handleOnProgressionChanged = (id, rank, increment) => {
    const activeFoes = this.props.activeFoes;
    activeFoes.map((f) => {
      if (f.id === id) {
        let val = 0;
        switch (rank) {
          case "Troublesome":
            val = increment ? 12 : -12;
            break;
          case "Dangerous":
            val = increment ? 8 : -8;
            break;
          case "Formidable":
            val = increment ? 4 : -4;
            break;
          case "Extreme":
            val = increment ? 2 : -2;
            break;
          case "Epic":
            val = increment ? 1 : -1;
            break;
        }
        f.progress += val;
        f.progress = f.progress > 40 ? 40 : f.progress;
        f.progress = f.progress < 0 ? 0 : f.progress;
      }
      return f;
    });
    this.setState({ activeFoes });
  };

  handleOnRankChanged = (evt, id) => {
    const activeFoes = this.props.activeFoes;
    activeFoes.map((f) => {
      if (f.id === id) {
        f.Rank = evt.target.value;
      }
      return f;
    });

    this.setState({ activeFoes });
  };

  handleOnProgressRollClicked = (id) => {
    const activeFoes = this.props.activeFoes;
    activeFoes.map((f) => {
      if (f.id === id) {
        f.progressRoll = this.diceRoller.progressionRoll(Math.floor(f.progress / 4));
        if (f.progressRoll.HitType.includes("Hit")) {
          f.complete = true;
          // this.logProgressionComplete();
        }
      }
      return f;
    });

    this.setState({ activeFoes });
  };

  handleProgressionDelete = (id) => {
    const activeFoes = this.props.activeFoes;
    let pos = -1;
    for (let i = 0; i < activeFoes.length; i++) {
      let foe = activeFoes[i];
      if (foe.id === id) {
        pos = i;
      }
    }
    if (pos != -1) activeFoes.splice(pos, 1);

    this.setState({ activeFoes });
  };

  getSelectedFoe() {
    return this.props.foes.find(
      (f) => f.Type === this.props.newFoe.newFoeCategoryId && f.Name === this.props.newFoe.newFoeTypeId
    );
  }

  componentDidUpdate() {
    this.props.onComponentUpdate();
  }

  render() {
    if (this.props.selectedPlayer == null) return <UnselectedPlayer />;
    let selectedFoe = this.getSelectedFoe();
    return (
      <React.Fragment>
        {this.state.showGenerator ? (
          <React.Fragment>
            <h1>Enter the Fray</h1>
            <div className="alert alert-secondary">
              Create a foe progress track with the <strong>Create a Foe</strong> form. The Foe generator/selector at the
              top of this page can generate details of foes the rulebooks. You can use additional details section to add
              key details about the foe, or to specify whether the track represents a <strong>Foe Pack</strong>
            </div>
            <div className="row">
              <div className="col">
                <button
                  className="btn btn-dark mt-2 mb-4"
                  type="button"
                  title="Roll on the oracle"
                  onClick={() => this.handleOnRollNewFoe("Ironsworn")}
                >
                  <RollIcon /> Random Foe
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
                    value={this.props.newFoe.newFoeCategoryId}
                    onChange={(e) => this.handleOnNewFoeCategoryChanged(e)}
                  >
                    <option>Select Foe Category</option>
                    {[...new Set(this.props.foes.map((f) => f.Type))].map((f, i) => (
                      <option key={f} value={f}>
                        {f}
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
                      title="Roll on the oracle"
                      onClick={() => this.handleOnRollNewFoeType()}
                    >
                      <RollIcon /> Foe Name
                    </button>
                  </div>

                  <select
                    className="form-control"
                    value={this.props.newFoe.newFoeTypeId}
                    onChange={(e) => this.handleOnNewFoeTypeChanged(e)}
                  >
                    <option>Select Foe Type</option>

                    {this.props.newFoe.newFoeCategoryId != -1 &&
                    this.props.newFoe.newFoeCategoryId != "Select Foe Category" ? (
                      <React.Fragment>
                        {this.props.foes
                          .filter((f) => f.Type === this.props.newFoe.newFoeCategoryId)
                          // .find((f) => this.props.foes.indexOf(f) == this.props.newFoe.newFoeCategoryId)
                          .map((f, i) => (
                            <option
                              key={f.Name}
                              value={f.Name} //{this.props.foes[this.props.newFoe.newFoeCategoryId].Foes.indexOf(f)}
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
                {this.props.newFoe.newFoeTypeId != -1 && this.props.newFoe.newFoeTypeId != "Select Foe Type" ? (
                  <React.Fragment>
                    <FoeOverviewTable
                      Category={selectedFoe.Type}
                      Type={selectedFoe.Name}
                      Rank={selectedFoe.Rank}
                      Source={selectedFoe.Source.Name}
                      Page={selectedFoe.Source.Page}
                      Drives={selectedFoe.Drives}
                      Features={selectedFoe.Features}
                      Tactics={selectedFoe.Tactics}
                    />
                    <div className="row mt-3">
                      <div className="col">
                        <button className="btn btn-dark" type="button" onClick={() => this.handleOnAddFoe()}>
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
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}

        {/* <div className="row">
          <div className="col">
            <button
              className="btn btn-dark mt-2 mb-4"
              type="button"
              onClick={() => this.props.onAddRandomPack()}
            >
              <RollIcon />
              &nbsp;Add Random Pack
            </button>
          </div>
        </div> */}
        <TitleBlock title="Active Foes" />
        <div className="row">
          <div className="col-6">
            {this.props.activeFoes
              .filter((f) => !f.complete)
              .map((f) => (
                <React.Fragment>
                  <FoeCard
                    foe={f}
                    ranks={this.props.ranks}
                    onProgressionChange={this.handleOnProgressionChanged}
                    onRankChange={this.handleOnRankChanged}
                    onProgressRollClicked={this.handleOnProgressRollClicked}
                    onFoeDelete={this.handleProgressionDelete}
                  />
                </React.Fragment>
              ))}
          </div>
        </div>
        <TitleBlock title="Defeated Foes" />
        <div className="row">
          <div className="col-6">
            {this.props.activeFoes
              .filter((f) => f.complete)
              .map((f) => (
                <React.Fragment>
                  <FoeCard
                    foe={f}
                    ranks={this.props.ranks}
                    onProgressionChange={this.handleOnProgressionChanged}
                    onRankChange={this.handleOnRankChanged}
                    onProgressRollClicked={this.handleOnProgressRollClicked}
                    onFoeDelete={this.handleProgressionDelete}
                  />
                </React.Fragment>
              ))}
          </div>
        </div>
        {/* <div className="row">
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
                            <div className="btn btn-tag btn-outline-light">{lf.Rank}</div>
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
                            this.handleOnProgressionChanged(lf.id, lf.Rank, increment)
                          }
                        />

                        <div className="text-center pt-3 pb-2">
                          <div className="row">
                            <div className="col-8">
                              <button
                                className="btn btn-dark pt-2 pb-2 btn-block"
                                onClick={() => this.props.onProgressRollClicked(lf.id, "foe", lf.progress)}
                              >
                                <RollIcon />
                                &nbsp; Roll Progress
                              </button>
                            </div>
                            <div className="col-4">
                              <button
                                className="btn btn-danger pt-2 pb-2 btn-block"
                                onClick={() => this.handleActiveFoeDelete(lf.id)}
                              >
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
        <TitleBlock title="Create a Foe" /> */}
      </React.Fragment>
    );
  }
}

export default EnterTheFray;
