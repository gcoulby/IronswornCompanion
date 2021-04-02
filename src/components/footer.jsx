import React, { Component } from "react";
import DiceResult from "./diceResult";
import DiceRoller from "./dice_roller";
import OracleRoller from "./oracleRoller";
import RollIcon from "./rollIcon";
class Footer extends Component {
  constructor(props) {
    super();
    this.diceRoller = new DiceRoller();
  }
  componentDidUpdate() {
    this.props.onComponentUpdate();
  }

  componentDidMount() {
    if (this.props.footerDice.HitType == undefined) {
      this.handleOnResetClick();
    }
  }

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
          name: p.title,
        });
      });
    }

    return progressions;
  }

  /*=================================*/
  /*    Events
  /*=================================*/

  handleOnProgressChange = (id) => {
    this.handleOnResetClick();
    const footerDice = this.props.footerDice;
    footerDice.ProgressId = id;
    this.setState({ footerDice });
  };

  handleOnStatChange = (evt) => {
    const footerDice = this.props.footerDice;
    footerDice.StatId = evt.target.value;
    this.setState({ footerDice });
  };

  handleOnAddValueChange = (evt) => {
    const footerDice = this.props.footerDice;
    footerDice.AddVal = evt.target.value;
    this.setState({ footerDice });
  };

  handleOnResetClick = () => {
    const footerDice = this.props.footerDice;
    footerDice.ProgressId = "";
    footerDice.StatId = "";
    footerDice.HitType = "";
    footerDice.AddVal = 0;
    footerDice.ActionScore = 0;
    this.setState({ footerDice });
  };

  handleOnRollClicked = () => {
    let dice;
    const footerDice = this.props.footerDice;
    let id = this.props.footerDice.ProgressId;
    let actionRoll = 0;
    let actionScore = 0;
    if (this.props.footerDice.ProgressId != "") {
      actionRoll = Math.floor(this.props.footerDice.ProgressId.split(" | ")[1] / 4);
      dice = this.diceRoller.roll([1, 10, 10], true);
      actionScore = actionRoll;
      footerDice.ActionValue = actionScore;
      // this.props.setState({ footerDice: footerDice });
    } else {
      actionRoll = 6;
      dice = this.diceRoller.roll([actionRoll, 10, 10], true);
      let stat = this.props.footerDice.StatId != "" ? this.props.footerDice.StatId.split(" | ")[1] : 0;
      actionScore = parseInt(dice[0].value) + parseInt(stat) + parseInt(this.props.footerDice.AddVal);

      footerDice.ActionValue = dice[0].value;
      // this.props.setState({ footerDice: footerDice });
    }
    let hitType =
      actionScore > dice[1].value && actionScore > dice[2].value
        ? "Strong Hit"
        : actionScore > dice[1].value || actionScore > dice[2].value
        ? "Weak Hit"
        : "Miss";
    footerDice.Challenge1Value = dice[1].value;
    footerDice.Challenge2Value = dice[2].value;
    footerDice.ActionScore = actionScore;
    footerDice.HitType = hitType;
    this.setState({ footerDice });
  };

  render() {
    return (
      <React.Fragment>
        <div className="footer-pre print-hide"></div>
        <div className="navbar fixed-bottom bg-dark text-light">
          <div className="col-12">
            <div className="row modesto">
              <div className="col-auto">
                {/* <p> */}
                <i className="mt-5 game-icon game-icon-d10 fa-4x"></i>
                {/* </p> */}
              </div>
              {/* <div className="col-auto">
                <label htmlFor="progress-select">Progress</label>
                <select
                  id="progress-select"
                  className="form-control bg-dark text-light"
                  onChange={(e) => this.handleOnProgressChange(e.target.value)}
                  value={this.props.footerDice.ProgressId}
                >
                  <option></option>
                  {this.getProgressions().map((p) => (
                    <React.Fragment>
                      <option value={`${p.id} | ${p.progress}`}>{`${p.type}: ${p.name} (${Math.floor(
                        p.progress / 4
                      )})`}</option>
                    </React.Fragment>
                  ))}
                </select>
              </div> */}
              <div className="col-auto">
                <label htmlFor="stat-select">Add Stat</label>
                <select
                  id="stat-select"
                  className="form-control bg-dark text-light"
                  onChange={(e) => this.handleOnStatChange(e)}
                  value={this.props.footerDice.StatId}
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
                  value={this.props.footerDice.AddVal}
                  onChange={(e) => this.handleOnAddValueChange(e)}
                  className="form-control bg-dark text-light"
                />
              </div>
              <div className="col-auto">
                <label>&nbsp;</label>
                <br />
                <button className="btn btn-outline-light" onClick={this.handleOnRollClicked}>
                  <RollIcon /> ROLL
                </button>
                <button className="btn btn-outline-secondary" onClick={() => this.handleOnResetClick()}>
                  <i className="fas fa-redo"></i>&nbsp;RESET
                </button>
                {this.props.footerDice.HitType != "" ? (
                  <React.Fragment>
                    <div className="btn btn-outline-light tip">
                      {this.props.footerDice.HitType}
                      <div className="top">
                        <h3>{this.props.footerDice.HitType}</h3>
                        {this.props.footerDice.ProgressId != "" ? (
                          <React.Fragment>
                            <p>Progress: {this.props.footerDice.ActionValue}</p>
                            <p>Challenge Dice 1: {this.props.footerDice.Challenge1Value}</p>
                            <p>Challenge Dice 2: {this.props.footerDice.Challenge2Value}</p>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <span>Action Score:</span>
                            <p>
                              Dice ({this.props.footerDice.ActionValue})
                              {this.props.footerDice.ProgressId == "" && this.props.footerDice.StatId != "" ? (
                                <React.Fragment>
                                  &nbsp;+&nbsp;
                                  {this.props.footerDice.StatId.split(" | ")[0]}
                                  &nbsp; ({this.props.footerDice.StatId.split(" | ")[1]})
                                </React.Fragment>
                              ) : (
                                React.Fragment
                              )}
                              &nbsp;+&nbsp;
                              {this.props.footerDice.AddVal} = &nbsp;
                              {this.props.footerDice.ActionScore}
                            </p>
                            <p>Challenge Dice 1: {this.props.footerDice.Challenge1Value}</p>
                            <p>Challenge Dice 2: {this.props.footerDice.Challenge2Value}</p>
                          </React.Fragment>
                        )}

                        <i></i>
                      </div>
                    </div>
                    {/* <DiceResult diceResult={this.props.footerDice} /> */}
                  </React.Fragment>
                ) : (
                  React.Fragment
                )}

                <OracleRoller oracles={this.props.oracles} onComponentUpdate={this.props.onComponentUpdate} />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Footer;
