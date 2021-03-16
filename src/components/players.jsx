import React, { Component } from "react";
import TitleBlock from "./titleBlock";
class Characters extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Characters</h1>
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col-6">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={() => this.props.onRollPlayerName()}
                    >
                      <i className="fas fa-dice-d20"></i> Roll
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Character Name"
                    aria-label="Name"
                    aria-describedby="basic-addon2"
                    value={this.props.newPlayerName}
                    onChange={(e) => this.props.onNewPlayerNameChanged(e)}
                  />
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={() => this.props.onRollPlayerGoal()}
                    >
                      <i className="fas fa-dice-d20"></i> Roll
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Character Goal"
                    aria-label="Character Goal"
                    aria-describedby="basic-addon2"
                    value={this.props.newPlayerGoal}
                    onChange={(e) => this.props.onNewPlayerGoalChanged(e)}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={() => this.props.onRollPlayerRole()}
                    >
                      <i className="fas fa-dice-d20"></i> Roll
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Character Role"
                    aria-label="Character Role"
                    aria-describedby="basic-addon2"
                    value={this.props.newPlayerRole}
                    onChange={(e) => this.props.onNewPlayerRoleChanged(e)}
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={() => this.props.onRollPlayerDescriptor()}
                    >
                      <i className="fas fa-dice-d20"></i> Roll
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Character Descriptor"
                    aria-label="Character Descriptor"
                    aria-describedby="basic-addon2"
                    value={this.props.newPlayerDescriptor}
                    onChange={(e) => this.props.onNewPlayerDescriptorChanged(e)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="alert alert-secondary">
                  There are five stats in total. Each is given a value from 1 to
                  3. To start, arrange these bonuses across your five stats in
                  any order: <b>3, 2, 2, 1, 1.</b> You can also roll on the
                  oracle to leave your primary stat choice down to fate.
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <h6>&nbsp;</h6>
                <button
                  className="btn btn-dark btn-block"
                  type="button"
                  onClick={() => this.props.onRollPlayerPrimaryStat()}
                >
                  <i className="fas fa-dice-d20"></i> Roll Primary Stat
                </button>
              </div>
              {this.props.newPlayerStats
                .filter((s) => s.type == "core")
                .map((s) => (
                  <div className="col-2">
                    <h6>{s.stat.toUpperCase()}</h6>
                    <input
                      data-name={s.stat}
                      className="form-control"
                      type="number"
                      min="1"
                      max="3"
                      value={s.value == 0 ? "" : s.value}
                      placeholder={s.stat}
                      onChange={(e) => this.props.onPlayerStatChanged(e)}
                    />
                  </div>
                ))}
            </div>
            <div className="row mt-5">
              <div className="col">
                <button
                  className="btn btn-dark"
                  type="button"
                  onClick={() => this.props.onAddCharacter()}
                >
                  <i className="fas fa-plus" aria-hidden="true"></i>
                  &nbsp;Add Character
                </button>
              </div>
            </div>
          </div>
        </div>
        <TitleBlock title="CHARACTER SELECTION" />

        <div className="row mt-4">
          {this.props.players.map((player) => (
            <div key={player.name} className="col-md-6 col-lg-3 col-sm-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="mb-2">{player.name}</h4>
                  <p>
                    <span className="modesto">Role: </span>
                    <span>{player.role}</span>
                  </p>
                  <p>
                    <span className="modesto">Goal: </span>
                    <span>{player.goal}</span>
                  </p>
                  <p>
                    <span className="modesto">Descriptor: </span>
                    <span>{player.descriptor}</span>
                  </p>
                  <div className="row">
                    <div className="col-md-6 col-sm-12">
                      <button
                        className="btn btn-dark btn-block"
                        onClick={() => this.props.onPlayerSelect(player.name)}
                      >
                        <i className="fas fa-user-plus" aria-hidden="true"></i>
                        &nbsp;Select
                      </button>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <button
                        className="btn btn-danger btn-block"
                        onClick={() => this.props.onPlayerDelete(player.name)}
                      >
                        <i className="fas fa-times" aria-hidden="true"></i>
                        &nbsp;Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Characters;
