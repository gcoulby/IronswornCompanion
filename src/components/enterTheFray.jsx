import React, { Component } from "react";
import DiceRoller from "./dice_roller";
import ProgressTrack from "./progressTrack";
import TitleBlock from "./titleBlock";
class EnterTheFray extends Component {
  state = {};

  constructor(props) {
    super();
    if (props.newFoe.nextFoeId === undefined) this.resetNewFoe(props);
    this.diceRoller = new DiceRoller();
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
    return this.diceRoller.roll([this.props.foes.length], false)[0].value;
  }

  getRandomFoeType(newFoeCategoryId) {
    return this.diceRoller.roll([this.props.foes[newFoeCategoryId].Foes.length], false)[0].value;
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

    const foe = this.props.foes[this.props.newFoe.newFoeCategoryId].Foes[this.props.newFoe.newFoeTypeId];
    foe.progress = 0;
    foe.id = this.props.newFoe.nextFoeId;
    activeFoes.loneFoes.push(foe);
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
    for (let i = 0; i < activeFoes.loneFoes.length; i++) {
      let af = activeFoes.loneFoes[i];
      if (af.id === id) {
        pos = i;
      }
    }

    if (pos != -1) activeFoes.loneFoes.splice(pos, 1);
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

    activeFoes.loneFoes.map((lf) => {
      if (lf.id == id) {
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
        lf.progress += val;
        lf.progress = lf.progress > 40 ? 40 : lf.progress;
        lf.progress = lf.progress < 0 ? 0 : lf.progress;
      }
      return lf;
    });
    this.setState({ activeFoes });
  };

  componentDidUpdate() {
    this.props.onComponentUpdate();
  }

  render() {
    return (
      <React.Fragment>
        <h1>Enter the Fray</h1>
        <div className="row">
          <div className="col">
            <button
              className="btn btn-dark mt-2 mb-4"
              type="button"
              title="Roll on the oracle"
              onClick={() => this.handleOnRollNewFoe()}
            >
              <i className="fas fa-dice-d20" aria-hidden="true"></i>
              &nbsp;Random Foe
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
                  title="Roll on the oracle"
                  onClick={() => this.handleOnRollNewFoeType()}
                >
                  <i className="fas fa-dice-d20"></i> Foe Type
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
                      .find((f) => this.props.foes.indexOf(f) == this.props.newFoe.newFoeCategoryId)
                      .Foes.map((f) => (
                        <option
                          key={f.Name}
                          value={this.props.foes[this.props.newFoe.newFoeCategoryId].Foes.indexOf(f)}
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
                {/* <p>
                  <span className="modesto">Description</span>&nbsp;
                  {
                    this.props.foes[this.props.newFoe.newFoeCategoryId].Foes[
                      this.props.newFoe.newFoeTypeId
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
                      {this.props.foes[this.props.newFoe.newFoeCategoryId].Foes[this.props.newFoe.newFoeTypeId].Rank}
                    </td>
                    <td>
                      {this.props.foes[this.props.newFoe.newFoeCategoryId].Foes[this.props.newFoe.newFoeTypeId].Source}
                    </td>
                    <td>
                      {this.props.foes[this.props.newFoe.newFoeCategoryId].Foes[this.props.newFoe.newFoeTypeId].Page}
                    </td>
                  </tbody>
                </table>
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
                                <i className="fas fa-dice-d20"></i>&nbsp; Roll Progress
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
      </React.Fragment>
    );
  }
}

export default EnterTheFray;
