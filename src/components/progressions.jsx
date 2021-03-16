import React, { Component } from "react";
import ProgressCard from "./progressCard";
import TitleBlock from "./titleBlock";
import UnselectedPlayer from "./unselected_player";
class Progression extends Component {
  state = {
    ranks: ["Troublesome", "Dangerous", "Formidable", "Extreme", "Epic"],
  };
  // handleUpdate() {
  //   this.props.selectedPlayer.rank = 2;
  //   this.props.onProgressUpdate();
  // }

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
                value={this.props.newProgression.text}
                onChange={(e) =>
                  this.props.onNewProgressionTextChanged(
                    e,
                    this.props.newProgression.type
                  )
                }
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="btn btn-dark btn-tag">Difficulty</label>
              </div>
              <select
                className="form-control"
                onChange={(e) =>
                  this.props.onNewProgressionRankChanged(
                    e,
                    this.props.newProgression.type
                  )
                }
                value={this.props.newProgression.rank}
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
              onClick={() =>
                this.props.onAddNewProgression(this.props.newProgression.type)
              }
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
                type={this.props.type}
                showRank={p.type != "bond"}
                ranks={this.state.ranks}
                rank={p.rank}
                progress={p.progress}
                progressText={p.text}
                rollText={this.props.newProgression.buttonText}
                onProgressionChange={this.props.onProgressionChange}
                onProgressionRankChange={this.props.onProgressionRankChange}
                onProgressRollClicked={this.props.onProgressRollClicked}
                // onProgressionRegress={this.props.onProgressionRegress}
              />
            ))}
        </div>

        <TitleBlock title={`COMPLETED ${this.props.title}`} />
      </React.Fragment>
    );
  }
}

export default Progression;
