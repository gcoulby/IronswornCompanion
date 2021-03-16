import React, { Component } from "react";
class Footer extends Component {
  state = {};

  getProgressions() {
    let progressions = [];

    this.props.npcs.map((n) => {
      progressions.push({
        id: `npc_${n.id}`,
        progress: n.bond,
        type: "NPC Bond",
        name: n.name,
      });
    });

    this.props.foes.map((f) => {
      progressions.push({
        id: `foe_${f.id}`,
        progress: f.progress,
        type: "FOE Combat",
        name: f.Name,
      });
    });
    if (this.props.selectedPlayer) {
      this.props.selectedPlayer.progressions.map((p) => {
        progressions.push({
          id: `${p.type}_${p.id}`,
          progress: p.progress,
          type: p.type,
          name: p.text,
        });
      });
    }

    return progressions;
  }

  render() {
    return (
      <React.Fragment>
        <div className="footer-pre print-hide"></div>
        <div className="navbar fixed-bottom bg-dark text-light">
          {/* <div className="col-1">
            <h4 className="mb-0 pt-2 pb-2">
              <i className="fas fa-dice-d20"></i>&emsp;
            </h4>
          </div> */}
          <div className="col-12">
            <div className="row modesto">
              <div className="col-auto">
                <p>
                  <i className="pt-4 fas fa-dice-d20 fa-3x"></i>
                </p>
              </div>
              <div className="col-auto">
                <label htmlFor="progress-select">Progress</label>
                <select
                  id="progress-select"
                  className="form-control bg-dark text-light"
                  onChange={(e) =>
                    this.props.onFooterDiceProgressChanged(e.target.value)
                  }
                  value={this.props.footerDiceProgressId}
                >
                  <option></option>
                  {this.getProgressions().map((p) => (
                    <React.Fragment>
                      <option value={`${p.id} | ${p.progress}`}>{`${p.type}: ${
                        p.name
                      } (${Math.floor(p.progress / 4)})`}</option>
                    </React.Fragment>
                  ))}
                </select>
              </div>
              <div className="col-auto">
                <label htmlFor="stat-select">Add Stat</label>
                <select
                  id="stat-select"
                  className="form-control bg-dark text-light"
                  onChange={(e) => this.props.onFooterDiceStatChanged(e)}
                  value={this.props.footerDiceStatId}
                >
                  <option></option>
                  {this.props.selectedPlayer ? (
                    <React.Fragment>
                      {this.props.selectedPlayer.stats
                        .filter((s) => s.stat != "Momentum")
                        .map((s) => (
                          <option key={s.stat} value={`${s.stat} | ${s.value}`}>
                            {s.stat}
                          </option>
                        ))}
                    </React.Fragment>
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                </select>
              </div>
              <div className="col-1">
                <label htmlFor="additional-add">Add</label>
                <input
                  type="number"
                  value={this.props.footerDiceAddVal}
                  onChange={(e) => this.props.onFooterDiceAddValueChanged(e)}
                  className="form-control bg-dark text-light"
                />
              </div>
              <div className="col-auto">
                <label>&nbsp;</label>
                <br />
                <button
                  className="btn btn-outline-light"
                  onClick={this.props.onFooterDiceRollClicked}
                >
                  <i className="fas fa-dice-d20"></i>&nbsp;ROLL
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => this.props.onFooterDiceResetClick()}
                >
                  <i className="fas fa-redo"></i>&nbsp;RESET
                </button>
                {this.props.footerDiceHitType != "" ? (
                  <React.Fragment>
                    <div class="btn btn-outline-light tip">
                      {this.props.footerDiceHitType}
                      <div class="top">
                        <h3>{this.props.footerDiceHitType}</h3>
                        {this.props.footerDiceProgressId != "" ? (
                          <React.Fragment>
                            <p>Progress: {this.props.footerActionValue}</p>
                            <p>
                              Challenge Dice 1:{" "}
                              {this.props.footerChallenge1Value}
                            </p>
                            <p>
                              Challenge Dice 2:{" "}
                              {this.props.footerChallenge2Value}
                            </p>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <span>Action Score:</span>
                            <p>
                              Dice ({this.props.footerActionValue})
                              {this.props.footerDiceProgressId == "" &&
                              this.props.footerDiceStatId != "" ? (
                                <React.Fragment>
                                  &nbsp;+&nbsp;
                                  {this.props.footerDiceStatId.split(" | ")[0]}
                                  &nbsp; (
                                  {this.props.footerDiceStatId.split(" | ")[1]})
                                </React.Fragment>
                              ) : (
                                React.Fragment
                              )}
                              &nbsp;+&nbsp;{this.props.footerDiceAddVal} =
                              &nbsp;
                              {this.props.footerActionScore}
                            </p>
                            <p>
                              Challenge Dice 1:{" "}
                              {this.props.footerChallenge1Value}
                            </p>
                            <p>
                              Challenge Dice 2:{" "}
                              {this.props.footerChallenge2Value}
                            </p>
                          </React.Fragment>
                        )}

                        <i></i>
                      </div>
                    </div>
                  </React.Fragment>
                ) : (
                  React.Fragment
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Footer;
