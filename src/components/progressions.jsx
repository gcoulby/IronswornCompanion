import React, { Component } from "react";
import DiceRoller from "./dice_roller";
import ProgressCard from "./progressCard";
import TitleBlock from "./titleBlock";
import UnselectedPlayer from "./unselected_player";
class Progression extends Component {
  state = {
    title: this.props.title,
    ranks: this.props.ranks,
    type: this.props.type,
    // newProgression: this.getProgressionByType(this.props.type),
  };
  // handleUpdate() {
  //   this.props.selectedPlayer.rank = 2;
  //   this.props.onProgressUpdate();
  // // }

  // constructor() {
  //   super();
  //   // this.oracles = props.oracles;

  // }

  componentDidMount() {
    this.diceRoller = new DiceRoller();
  }

  handleOnNewProgressionTextChanged = (evt, field) => {
    const newProgressions = this.props.newProgressions.map((np) => {
      if (np.type == this.state.type) {
        np[field] = evt.target.value;
      }
      return np;
    });
    this.setState({ newProgressions });
  };

  handleOnNewProgressionRankChanged = (evt) => {
    const newProgressions = this.props.newProgressions.map((np) => {
      if (np.type == this.state.type) {
        np.rank = evt.target.value;
      }
      return np;
    });
    this.setState({ newProgressions });
  };

  handleOnAddNewProgression = () => {
    // let type = "vow";
    if (this.getProgressionByType(this.state.type).title != "") {
      const players = this.props.players.map((p) => {
        if (p.selected) {
          p.progressions.push({
            id: this.getProgressionByType(this.state.type).nextId,
            type: this.state.type,
            progress: 0,
            title: this.getProgressionByType(this.state.type).title,
            details: this.getProgressionByType(this.state.type).details,
            rank: this.getProgressionByType(this.state.type).rank,
            complete: false,
            progressRoll: null,
          });
          this.logProgressionStart();
        }
        return p;
      });

      const newProgressions = this.props.newProgressions.map((np) => {
        if (np.type == this.state.type) {
          np.text = "";
          np.rank = 0;
          np.nextId++;
        }
        return np;
      });
      this.setState({ players });
      this.setState({ newProgressions });
    }
  };

  logProgressionStart = () => {
    let logText = "";
    switch (this.state.type) {
      case "vow":
        logText = "swore a vow";
        break;
      case "quest":
        logText = "began a quest";
        break;
      case "journey":
        logText = "embarked on a journey";
        break;
      case "foe":
        logText = "discovered a new foe";
        break;
    }
    this.props.addLog(
      "event",
      `${this.props.selectedPlayer.name} ${logText}: ${this.getProgressionByType(this.state.type).title}`
    );
  };

  logProgressionComplete = () => {
    let logText = "";
    switch (this.state.type) {
      case "vow":
        logText = "fulfilled a vow";
        break;
      case "quest":
        logText = "completed a quest";
        break;
      case "journey":
        logText = "completed their journey";
        break;
      case "foe":
        logText = "defeated the foe";
        break;
    }
    this.props.addLog(
      "event",
      `${this.props.selectedPlayer.name} ${logText}: ${this.getProgressionByType(this.state.type).title}`
    );
  };

  logProgressionFailed = () => {
    let logText = "";
    switch (this.state.type) {
      case "vow":
        logText = "forsaken a vow";
        break;
      case "quest":
        logText = "abandoned a quest";
        break;
      case "journey":
        logText = "abandoned their journey";
        break;
      case "foe":
        logText = "lost sight of the foe";
        break;
    }
    this.props.addLog(
      "event",
      `${this.props.selectedPlayer.name} ${logText}: ${this.getProgressionByType(this.state.type).title}`
    );
  };

  handleOnProgressionChanged = (id, rank, increment) => {
    const players = this.props.players.map((p) => {
      if (p.selected) {
        p.progressions
          .filter((p1) => p1.type === this.state.type)
          .map((p2) => {
            if (p2.id == id) {
              let val = 0;
              switch (parseInt(rank)) {
                case 0:
                  val = increment ? 12 : -12;
                  break;
                case 1:
                  val = increment ? 8 : -8;
                  break;
                case 2:
                  val = increment ? 4 : -4;
                  break;
                case 3:
                  val = increment ? 2 : -2;
                  break;
                case 4:
                  val = increment ? 1 : -1;
                  break;
              }
              console.log(p2);
              if (increment)
                this.props.addLog("event", `${p.name} made progress towards their ${p2.type}: ${p2.title}`);
              else this.props.addLog("event", `${p.name} loses ground towards their ${p2.type}: ${p2.title}`);
              p2.progress += val;
              p2.progress = p2.progress > 40 ? 40 : p2.progress;
              p2.progress = p2.progress < 0 ? 0 : p2.progress;
            }
          });
      }

      return p;
    });
    this.setState({ players });
  };

  handleOnProgressionPropertyChanged = (evt, id, field) => {
    const players = this.props.players.map((p) => {
      if (p.selected) {
        p.progressions
          .filter((p1) => p1.type === this.state.type)
          .map((p2) => {
            if (p2.id == id) {
              p2[field] = evt.target.value;
            }
          });
      }
      return p;
    });
    this.setState({ players });
  };

  handleProgressionDelete = (id) => {
    const players = this.props.players.map((p) => {
      if (p.selected) {
        let pos = -1;
        for (let i = 0; i < p.progressions.length; i++) {
          let prog = p.progressions[i];
          if (prog.id === id && prog.type === this.state.type) {
            pos = i;
            if (!prog.complete) this.logProgressionFailed();
          }
        }
        if (pos != -1) p.progressions.splice(pos, 1);
      }
      return p;
    });

    this.setState({ players });
  };

  handleOnProgressRollClicked = (id, type, progress) => {
    const players = this.props.players.map((p) => {
      if (p.selected) {
        p.progressions
          .filter((p1) => p1.type === this.state.type)
          .map((p2) => {
            if (p2.id == id) {
              p2.progressRoll = this.diceRoller.progressionRoll(Math.floor(p2.progress / 4));
              if (p2.progressRoll.HitType.includes("Hit")) {
                p2.complete = true;
                this.logProgressionComplete();
              }
            }
          });
      }
      return p;
    });
    this.setState({ players });
  };

  getProgressionByType(type = null) {
    if (type === null) type = this.state.type;
    return this.props.newProgressions.find((np) => np.type == type);
  }

  componentDidUpdate() {
    this.props.onComponentUpdate();
  }

  render() {
    if (this.props.selectedPlayer == null) return <UnselectedPlayer />;
    return (
      <React.Fragment>
        {this.props.supressTitle ? React.Fragment : <h1>{this.props.title}</h1>}
        {this.props.info ? (
          <React.Fragment>
            <div className="alert alert-secondary" role="alert">
              {this.props.info}
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}

        <div className="row">
          <div className="col-6">
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <label className="btn btn-dark btn-tag">Name</label>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                aria-label="Name"
                aria-describedby="basic-addon2"
                value={this.getProgressionByType().title}
                onChange={(e) => this.handleOnNewProgressionTextChanged(e, "title")}
              />
            </div>

            <span className="modesto mt-2">Additional Details:</span>
            <textarea
              type="text"
              className="form-control"
              placeholder="Description"
              aria-label="Name"
              aria-describedby="basic-addon2"
              rows="4"
              value={this.getProgressionByType().details}
              onChange={(e) => this.handleOnNewProgressionTextChanged(e, "details")}
            ></textarea>

            <div className="input-group mt-3 mb-2">
              <div className="input-group-prepend">
                <label className="btn btn-dark btn-tag">Difficulty</label>
              </div>
              <select
                className="form-control"
                onChange={(e) => this.handleOnNewProgressionRankChanged(e)}
                value={this.getProgressionByType().rank}
              >
                {this.state.ranks.map((r) => (
                  <option key={this.state.ranks.indexOf(r)} value={this.state.ranks.indexOf(r)}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn btn-dark" type="button" onClick={() => this.handleOnAddNewProgression()}>
              <i className="fas fa-plus" aria-hidden="true"></i>
              &nbsp;Add {this.props.type}
            </button>
          </div>
        </div>
        <TitleBlock title={`ACTIVE ${this.props.title}`} />
        <div className="row">
          {this.props.selectedPlayer.progressions
            .filter((pr) => pr.type == this.props.type && !pr.complete)
            .map((p) => (
              <ProgressCard
                key={p.id}
                id={p.id}
                type={this.state.type}
                showRank={p.type != "bond"}
                ranks={this.state.ranks}
                rank={p.rank}
                progress={p.progress}
                progressText={p.text}
                progression={p}
                rollText={this.getProgressionByType().buttonText}
                onProgressionChange={this.handleOnProgressionChanged}
                onProgressionPropertyChange={this.handleOnProgressionPropertyChanged}
                onProgressRollClicked={this.handleOnProgressRollClicked}
                onProgressCancel={this.handleProgressionDelete}
              />
            ))}
        </div>
        <TitleBlock title={`${this.props.title === "Foes" ? "DEFEATED" : "COMPLETED"} ${this.props.title}`} />
        <div className="row">
          {this.props.selectedPlayer.progressions
            .filter((pr) => pr.type == this.props.type && pr.complete)
            .map((p) => (
              <ProgressCard
                key={p.id}
                id={p.id}
                type={this.state.type}
                showRank={p.type != "bond"}
                ranks={this.state.ranks}
                rank={p.rank}
                progress={p.progress}
                progressText={p.text}
                progression={p}
                rollText={this.getProgressionByType().buttonText}
                onProgressionChange={this.handleOnProgressionChanged}
                onProgressionPropertyChange={this.handleOnProgressionPropertyChanged}
                onProgressRollClicked={this.handleOnProgressRollClicked}
                onProgressCancel={this.handleProgressionDelete}
              />
            ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Progression;
