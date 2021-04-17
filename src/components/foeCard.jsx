import React, { Component } from "react";
import parse from "html-react-parser";
import ReactMarkdown from "react-markdown";
import DefaultFoe from "../models/defaultFoe";
import ProgressTrack from "./progressTrack";
import TitleBlock from "./titleBlock";
import RollButton from "./rollButton";
import DangerButton from "./dangerButton";

class FoeCard extends Component {
  state = {};
  content(name, text) {
    let str = "";
    if (text.includes("</")) {
      str = name ? `<strong>${name}:</strong>&nbsp${text}` : text;
      return parse(str);
    } else {
      str = name ? `**${name}:** ${text}` : text;
      return <ReactMarkdown>{str}</ReactMarkdown>;
    }
  }

  componentDidMount() {
    const foe = new DefaultFoe();
    this.setState({ foe });
  }

  getRankText(rank) {
    switch (rank) {
      case "Troublesome":
        return "(3 progress per harm; inflicts 1 harm)";
      case "Dangerous":
        return "(2 progress per harm; inflicts 2 harm)";
      case "Formidable":
        return "(1 progress per harm; inflicts 3 harm)";
      case "Extreme":
        return "(2 ticks per harm; inflicts 4 harm)";
      case "Epic":
        return "(1 ticks per harm; inflicts 5 harm)";
    }
  }

  getDescription = () => {
    let maxLen = 300;
    let description = this.props.foe.Description;
    let separator = " ";

    if (!this.props.foe.core || description.length <= maxLen) return description;

    let end = `... (read more: ${this.props.foe.Source.Name} page ${this.props.foe.Source.Page})`;
    return description.substr(0, description.lastIndexOf(separator, maxLen)) + end;
  };

  render() {
    return (
      <React.Fragment>
        <div className={`card foe-card ${this.props.idx != undefined ? `foe-card-${this.props.idx}` : ""}`}>
          <div className="card-header bg-dark text-light">
            <h6>{this.props.foe.Type}</h6>

            <div className="foe-icon">
              <i className={`game-icon game-icon-${this.props.foe.icon}`} aria-hidden="true"></i>
            </div>
          </div>
          <div className="card-body">
            <h4>{this.props.foe.Name}</h4>
            <div className="prog"></div>
            <ProgressTrack
              hideButtons={this.props.static || this.props.foe.complete}
              progress={this.props.foe.progress}
              onProgressionChange={(increment) =>
                this.props.onProgressionChange(this.props.foe.id, this.props.foe.Rank, increment)
              }
            />
            {/* <span className="modesto mt-3">DESCRIPTION</span> */}
            {this.content("Description", this.getDescription())}
            {this.content("Quest", this.props.foe.Quest)}

            {/* <p>{this.getDescription()}</p> */}
            {/* {this.props.foe.Quest !== undefined ?  : React.Fragment} */}
            {/* <span className="modesto mt-3">QUEST</span> */}
            {/* {this.props.foe.Quest !== undefined ? <p>{this.props.foe.Quest}</p> : React.Fragment} */}
            {/* <span className="modesto mt-3">FEATURES</span>
            <table className="table table-striped text-left">
              <tbody>
                {this.props.foe.Features.map((f) => {
                  return (
                    <React.Fragment>
                      <tr>
                        <td>{f}</td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table> */}
            <table className="table text-left">
              <tbody>
                <tr>
                  <th>Rank:</th>
                  <td style={{ paddingLeft: 2 + "em" }}>
                    {this.props.static || this.props.foe.complete ? (
                      <React.Fragment>
                        {this.props.foe.Rank} {this.getRankText(this.props.foe.Rank)}
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <select
                          disabled={this.props.foe.complete}
                          className="form-control modesto"
                          value={this.props.foe.Rank}
                          onChange={(e) => this.props.onRankChange(e, this.props.foe.id)}
                        >
                          {this.props.ranks.map((r) => (
                            <option key={this.props.ranks.indexOf(r)} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </React.Fragment>
                    )}
                  </td>
                </tr>
                <tr>
                  <th>Features:</th>
                  <td>
                    <ul>
                      {this.props.foe.Features.map((f) => {
                        return <React.Fragment>{f != "" ? <li>{f}</li> : React.Fragment}</React.Fragment>;
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>Drives:</th>
                  <td>
                    <ul>
                      {this.props.foe.Drives.map((d) => {
                        return <React.Fragment>{d != "" ? <li>{d}</li> : React.Fragment}</React.Fragment>;
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>Tactics:</th>
                  <td>
                    <ul>
                      {this.props.foe.Tactics.map((t) => {
                        return <React.Fragment>{t != "" ? <li>{t}</li> : React.Fragment}</React.Fragment>;
                      })}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="text-center controls print-hide">
              <div className="row">
                <div className={`col${!this.props.static ? "-8" : ""}`}>
                  <RollButton
                    buttonText="Defeat"
                    disabled={this.props.static || this.props.foe.complete}
                    roll={this.props.foe.progressRoll}
                    onRoll={() => this.props.onProgressRollClicked(this.props.foe.id)}
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
                {!this.props.static ? (
                  <React.Fragment>
                    <div className="col-4">
                      <DangerButton
                        buttonText="Cancel"
                        additionalButtonClasses="pt-2 pb-2 btn-block"
                        iconClass="fas fa-times"
                        onDangerClick={this.props.onFoeDelete}
                        deleteId={this.props.foe.id}
                        deleteMessage="Are you sure you want to delete this foe?"
                      />
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

export default FoeCard;
