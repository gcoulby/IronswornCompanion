import React, { Component } from "react";
import ProgressCard from "./progressCard";
import TitleBlock from "./titleBlock";
import UnselectedPlayer from "./unselected_player";
class Progression extends Component {
  state = {
    title: this.props.title,
    ranks: ["Troublesome", "Dangerous", "Formidable", "Extreme", "Epic"],
    type: this.props.type,
    // newProgression: this.getProgressionByType(this.props.type),
  };
  // handleUpdate() {
  //   this.props.selectedPlayer.rank = 2;
  //   this.props.onProgressUpdate();
  // }

  handleOnNewProgressionTextChanged = (evt) => {
    const newProgressions = this.props.newProgressions.map((np) => {
      if (np.type == this.state.type) {
        np.text = evt.target.value;
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
    if (this.getProgressionByType(this.state.type).text != "") {
      const players = this.props.players.map((p) => {
        if (p.selected) {
          p.progressions.push({
            id: this.getProgressionByType(this.state.type).nextId,
            type: this.state.type,
            progress: 0,
            text: this.getProgressionByType(this.state.type).text,
            rank: this.getProgressionByType(this.state.type).rank,
          });
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

  handleOnProgressionRankChanged = (evt, id) => {
    const players = this.props.players.map((p) => {
      if (p.selected) {
        p.progressions
          .filter((p1) => p1.type === this.state.type)
          .map((p2) => {
            if (p2.id == id) {
              p2.rank = evt.target.value;
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
          }
        }
        if (pos != -1) p.progressions.splice(pos, 1);
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

  //TODO: CANCEL VOW
  render() {
    if (this.props.selectedPlayer == null) return <UnselectedPlayer />;
    return (
      <React.Fragment>
        <h1>{this.props.title}</h1>
        {this.props.info ? (
          <React.Fragment>
            <div class="alert alert-secondary" role="alert">
              {this.props.info}
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}

        <div className="row">
          <div className="col-6">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="btn btn-dark btn-tag">Description</label>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                aria-label="Name"
                aria-describedby="basic-addon2"
                value={this.getProgressionByType().text}
                onChange={(e) => this.handleOnNewProgressionTextChanged(e)}
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="btn btn-dark btn-tag">Difficulty</label>
              </div>
              <select
                className="form-control"
                onChange={(e) => this.handleOnNewProgressionRankChanged(e)}
                value={this.getProgressionByType().rank}
              >
                {this.state.ranks.map((r) => (
                  <option
                    key={this.state.ranks.indexOf(r)}
                    value={this.state.ranks.indexOf(r)}
                  >
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="btn btn-dark"
              type="button"
              onClick={() => this.handleOnAddNewProgression()}
            >
              <i className="fas fa-plus" aria-hidden="true"></i>
              &nbsp;Add {this.props.type}
            </button>
          </div>
        </div>
        <TitleBlock title={`ACTIVE ${this.props.title}`} />
        <div className="row">
          {this.props.selectedPlayer.progressions
            .filter((pr) => pr.type == this.props.type)
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
                rollText={this.getProgressionByType().buttonText}
                onProgressionChange={this.handleOnProgressionChanged}
                onProgressionRankChange={this.handleOnProgressionRankChanged}
                onProgressRollClicked={this.props.onProgressRollClicked}
                onProgressCancel={this.handleProgressionDelete}
                // onProgressionRegress={this.props.onProgressionRegress}
              />
            ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Progression;
